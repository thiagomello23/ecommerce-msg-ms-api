import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class AppController {

    @MessagePattern('MESSSSAGE')
    async getUser(@Payload() data:any) {
        console.log("Received data:", data)
        return "Received with success!"
    }

}