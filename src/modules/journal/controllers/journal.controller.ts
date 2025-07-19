import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JournalService } from '../services/journal.service';
import { CreateJournalDto } from '../dto/create-journal.dto';
import { UpdateJournalDto } from '../dto/update-journal.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth/auth.guard';

@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) { }

  // @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createJournalDto: CreateJournalDto,
    @Request() req: any) {
    console.log('CREATE', createJournalDto);


    return this.journalService.create(createJournalDto);
  }

  @Get()
  findAll() {
    return this.journalService.findAll();
  }

  // @UseGuards(AuthGuard)
  @Get('my_journals/:id')
  findOne(@Param('id') id: string) {
    return this.journalService.myEntries(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJournalDto: UpdateJournalDto) {
    return this.journalService.update(+id, updateJournalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.journalService.remove(+id);
  }
}
