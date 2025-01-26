import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import axios from 'axios';

@WebSocketGateway({ cors: true })
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    const token = client.handshake.auth.token;
    const tenantId = client.handshake.auth.tenantId;

    if (!token || !tenantId) {
      console.log('Unauthorized connection attempt');
      client.disconnect();
      return;
    }
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected`);
  }

  @SubscribeMessage('getMessages')
  async handleGetMessages(
    client: Socket,
    payload: { senderId: string; receiverId: string },
  ) {
    console.log(
      'Fetching messages between:',
      payload.senderId,
      payload.receiverId,
    );

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
    console.log('Sending message via REST endpoint');
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
      console.log('Response:', response.data);

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
