import { Server, Socket } from 'socket.io';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { GameService } from './game.service';

interface PositionData {
  x: number;
  y: number;
  r: number;
}

interface PlayerInfo {
  username: string;
  x: number;
  y: number;
  r: number;
  playerId: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GameGateway {
  @WebSocketServer()
  server: Server;

  private players: Map<string, PlayerInfo>;

  constructor(private readonly gameService: GameService) {
    this.players = new Map<string, PlayerInfo>();
  }

  @SubscribeMessage('connection')
  async handleConnection(client: Socket) {
    console.log(
      `Player connected: ${client.id}:${client.handshake.auth.username}`,
    );

    if (client.handshake.auth.username?.length === 0) {
      console.log('Rejected connection due to username');
      client.disconnect();

      return;
    }

    client.on('disconnect', () => {
      console.log(`Player disconnected: ${client.id}`);

      // remove this player from our players object
      delete this.players[client.id];

      // emit a message to all players to remove this player
      this.server.emit('playerDisconnected', client.id);
    });

    // create a new player and add it to our players object
    // TODO: Update this to get position from database or a standard spawn point default
    let playerObj: PlayerInfo;
    try {
      const playerInstance = await this.gameService.findOrCreate(client.handshake.auth.username);

      playerObj = {
        playerId: client.id,
        username: playerInstance.getDataValue('username'),
        x: playerInstance.getDataValue('x'),
        y: playerInstance.getDataValue('y'),
        r: playerInstance.getDataValue('r'),
      }
    } catch (error) {
      playerObj = {
        playerId: client.id,
        username: client.handshake.auth.username,
        x: 0,
        y: 0,
        r: 0,
      }
    }

    this.players[client.id] = playerObj;
    console.log(this.players);

    // send the players object to the new player
    client.emit('currentPlayers', this.players);

    // update all other players of the new player
    client.broadcast.emit('newPlayer', this.players[client.id]);
  }

  @SubscribeMessage('playerMovement')
  async handlePlayerMovement(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: PositionData,
  ) {
    console.log(
      `${client.id} moved to {x: ${data.x}, y: ${data.y}, r: ${data.r}}`,
    );

    // TODO: This could be exploited by client if they were to change the value before sending
    // So we should receive a move direction and then update it according to known speed values
    this.players[client.id].x = data.x;
    this.players[client.id].y = data.y;
    this.players[client.id].r = data.r;

    try {
      await this.gameService.updatePosition(this.players[client.id].username, data.x, data.y, data.r);
    } catch(error) {}

    // emit a message to all players about the player that moved
    client.broadcast.emit('playerMoved', this.players[client.id]);
  }
}
