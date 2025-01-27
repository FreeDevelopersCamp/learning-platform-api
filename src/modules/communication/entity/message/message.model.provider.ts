import { Connection } from "mongoose";
import { Message, MessageSchema } from "./message.schema";

export const MessageModels = {
    message: {
      provide: 'MESSAGE_MODEL',
      useFactory: async (tenantConnection: Connection) => {
        return tenantConnection.model(Message.name, MessageSchema);
      },
      inject: ['TENANT_CONNECTION'],
    },
  };
