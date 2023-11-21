import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Message } from './message/schema/message.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('GetChat')
  getChat(): Promise<{messages:Message[]}>{
    return this.appService.getAllChat();
  }
  @EventPattern('msg-sender')
  public async execute(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();

    console.log('data');
    console.log(data);
    await this.appService.saveMessage(data);

    channel.ack(orginalMessage);
  }
}
