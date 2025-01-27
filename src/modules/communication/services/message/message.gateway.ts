import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import axios from 'axios';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    const token = client.handshake.auth.token;
    const tenantId = client.handshake.auth.tenantId;

    if (!token || !tenantId) {
      client.disconnect(true); // Forcefully disconnect the client
      return;
    }

    client.join(client.handshake.auth.userId);
    setInterval(() => {
      console.log(
        'Active rooms:',
        Array.from(this.server.sockets.adapter.rooms.keys()),
      );
    }, 5000);
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    console.log(
      `Remaining clients:`,
      Array.from(this.server.sockets.sockets.keys()),
    );
  }

  @SubscribeMessage('getMessages')
  async handleGetMessages(
    client: Socket,
    payload: { senderId: string; receiverId: string },
  ) {
    try {
      const response = await axios.get(
        `http://localhost:3030/api/v1/message/${payload.senderId}/${payload.receiverId}`,
        {
          headers: {
            Authorization: client.handshake.auth.token,
            'x-tenant-id': client.handshake.auth.tenantId,
          },
        },
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error.message);
      client.emit('error', {
        message: 'Failed to fetch messages',
        details: error.message,
      });
    }
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    client: Socket,
    payload: { senderId: string; receiverId: string; content: string },
  ) {
    try {
      const response = await axios.post(
        'http://localhost:3030/api/v1/message/send',
        { message: payload }, // Wrap the payload in a "message" object
        {
          headers: {
            Authorization: client.handshake.auth.token,
            'x-tenant-id': client.handshake.auth.tenantId,
          },
        },
      );

      const message = response.data;
      this.server.to(payload.receiverId).emit('newMessage', message); // Notify the receiver
      return message; // Acknowledge the sender
    } catch (error) {
      console.error('Error in handleSendMessage:', error.message);
      client.emit('error', {
        message: 'Failed to send message',
        details: error.message,
      });
    }
  }
}
