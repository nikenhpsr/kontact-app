import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactEntity } from './entities/contact.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('contacts')
@ApiTags('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ContactEntity })
  async create(@Body() createContactDto: CreateContactDto) {
    return new ContactEntity(await this.contactsService.create(createContactDto),);
  }
  
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: [ContactEntity], isArray: true })
  async findAll() {
    const contacts = await this.contactsService.findAll();
    return contacts.map((contact) => new ContactEntity(contact));
  }
  
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: [ContactEntity] })
  async findOne(@Param('id') id: string) {
    const contact = await this.contactsService.findOne(id);
    if (!contact) {
      throw new NotFoundException(`Contact with id ${id} does not found`);
    }
    return new ContactEntity(contact);
  }
  
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: [ContactEntity] })
  async update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    const contact = await this.contactsService.findOne(id);
    const update = await this.contactsService.update(id, updateContactDto);
    if (!contact) {
      throw new NotFoundException(`Contact with id ${id} does not found`);
    }
    return new ContactEntity(update);
  }
  
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: [ContactEntity] })
  async remove(@Param('id') id: string) {
    const contact = await this.contactsService.findOne(id);
    const del = await this.contactsService.remove(id);
    if (!contact) {
      throw new NotFoundException(`Contact with id ${id} does not found`);
    }
    return new ContactEntity(del);
  }
}
