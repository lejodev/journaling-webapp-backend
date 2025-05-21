import { Injectable } from '@nestjs/common';
import { CreateJournalDto } from '../dto/create-journal.dto';
import { UpdateJournalDto } from '../dto/update-journal.dto';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { Journal } from '../entities/journal.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class JournalService {

  constructor(private wrapperService: WrapperService) {


  }

  create(createJournalDto: CreateJournalDto) {
    return 'This action adds a new journal';
  }

  findAll() {
    return this.wrapperService.findAll(Journal)
  }

  myEntries(userId: number) {
    return this.wrapperService.GET<Journal>(Journal, {
      where: {
        user: {
          id: userId
        }
      },
      relations: ['user']
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} journal`;
  }

  update(id: number, updateJournalDto: UpdateJournalDto) {
    return `This action updates a #${id} journal`;
  }

  remove(id: number) {
    return `This action removes a #${id} journal`;
  }
}
