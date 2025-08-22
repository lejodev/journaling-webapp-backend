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
@UseGuards(AuthGuard)
export class JournalController {
  constructor(private readonly journalService: JournalService) { }

  @Post()
  create(
    @Body() createJournalDto: CreateJournalDto,
    @Request() req: any) {
    console.log('CREATE', createJournalDto);


    return this.journalService.create(createJournalDto);
  }

  @Get()
  findAll(@Request() req: any) {
    console.log("req*********", req.user);

    return this.journalService.findAll();
  }

  // @UseGuards(AuthGuard)
  @Get('my_journals')
  find(@Request() req: any) {
    console.log(req.user.id);

    let userId = req.user.id;

    console.log('My journals for ', userId);

    if (!userId) {
      return {
        message: 'User ID is required',
        status: 400,
      };

    }

    return this.journalService.myEntries(req.user.id);
  }

  @Get('my_journal/:id')
  findOne(@Param('id') id: string) {
    return this.journalService.findOne(+id);
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
