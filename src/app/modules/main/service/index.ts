import { GatewayService } from './gateway.service';
import { SocketProviderService } from './socket-provider.service';

export function provideServices(): any[] {
  return [SocketProviderService, GatewayService];
}
