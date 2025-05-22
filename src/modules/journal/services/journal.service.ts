import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateJournalDto } from '../dto/create-journal.dto';
import { UpdateJournalDto } from '../dto/update-journal.dto';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { Journal } from '../entities/journal.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JournalService {

  constructor(private wrapperService: WrapperService) {


  }

  create(createJournalDto: CreateJournalDto) {


    try {
      const { title, content, userId } = createJournalDto
      if (!content || !title || !userId) {
        console.log("In error");
        throw new HttpException('Title, content and userId are required', 400);
      }
      const convertJournal = {
        title: title.trim(),
        content: content.trim(),
        user: { id: userId }
      }
      return this.wrapperService.create(Journal, convertJournal)
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 500);

    }

    // return 'This action adds a new journal';
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

  async update(id: number, updateJournalDto: UpdateJournalDto) {
    try {

      if (!id) {
        throw new BadRequestException('Journal id is required')
      }

      if (!updateJournalDto || (!updateJournalDto.content && !updateJournalDto.title)) {
        throw new BadRequestException(`At least a title or content should be provided`)
      }

      const journal = await firstValueFrom(this.wrapperService.findOne(Journal, { id }))
      console.log(journal);

      if (!journal) {
        throw new NotFoundException(`Journal with id: ${id} not found`)
      }

      const result = await firstValueFrom(this.wrapperService.update(Journal, { id }, updateJournalDto))

      if (result.affected == 0) {
        throw new NotFoundException(`Journal with id: ${id} can not be updated`)
      }

      return {
        message: "Journal successfully updated"
      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error
      }

      // I need to add a proper log system here, in order to catch up errors and solve them asap!

      throw new InternalServerErrorException('Failed to update journal')

    }
  }

  async remove(id: number) {

    if (!id) {
      throw new HttpException('Id is required', 400);
    }

    const journal = await firstValueFrom(this.wrapperService.findOne(Journal, { id: id }))
    console.log(journal);

    if (!journal) {
      throw new NotFoundException(`Journal with id: ${id} not found`)
    }

    const deleteResult = await firstValueFrom(this.wrapperService.delete(Journal, id.toString()))

    if (deleteResult.affected == 0) {
      throw new NotFoundException(`Journal with id: ${id} could not be deleted`)
    }

    return {
      message: `Journal with id: ${id} deleted successfully`,
      success: true
    }
  }
}
