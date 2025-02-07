import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('favorites')
@UseGuards(AuthGuard('jwt'))
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  create(@Request() req, @Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.create(req.user.userId, createFavoriteDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.favoritesService.findAll(req.user.userId);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.favoritesService.remove(req.user.userId, id);
  }
}
