import { SetMetadata } from '@nestjs/common';

export const Throttle = (...args: string[]) => SetMetadata('throttle', args);
