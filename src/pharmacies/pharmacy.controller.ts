import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    HttpException,
    HttpStatus,
    Query,
    UseGuards, BadRequestException
} from '@nestjs/common';
import { PharmacyService } from './pharmacy.service';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';
import { PharmacyResponseDto } from './dto/pharmacy-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { PharmacyInterface } from '../interfaces/pharmacy.interface';

@Controller('pharmacies')
@UseGuards(AuthGuard('jwt'))
export class PharmacyController {
    constructor(private readonly pharmacyService: PharmacyService) { }

    @Post()
    async create(@Body() createPharmacyDto: CreatePharmacyDto): Promise<{ id: string }> {
        try {
            const id = await this.pharmacyService.createPharmacy(createPharmacyDto);
            return { id };
        } catch (error) {
            throw new HttpException('Failed to create pharmacy', HttpStatus.INTERNAL_SERVER_ERROR

            );
        }
    }

    @Get()
    async findAll(): Promise<PharmacyResponseDto[]> {
        try {
            const pharmacies = await this.pharmacyService.getAllPharmacies();
            return pharmacies.map(pharmacy => new PharmacyResponseDto(pharmacy));
        } catch (error) {
            throw new HttpException(
                'Failed to fetch pharmacies',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }


    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updatePharmacyDto: UpdatePharmacyDto,
    ): Promise<{ message: string }> {
        try {
            await this.pharmacyService.updatePharmacy(id, updatePharmacyDto);
            return { message: 'Pharmacy updated successfully' };
        } catch (error) {
            throw new HttpException(
                'Failed to update pharmacy',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<{ message: string }> {
        try {
            await this.pharmacyService.deletePharmacy(id);
            return { message: 'Pharmacy deleted successfully' };
        } catch (error) {
            throw new HttpException(
                'Failed to delete pharmacy',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    @Get('nearby-guard')
    async getNearbyGuardPharmacies(
        @Query('lat') lat: string,
        @Query('lng') lng: string,
    ): Promise<PharmacyInterface[]> {
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);
    
        if (isNaN(latitude) || isNaN(longitude)) {
            throw new BadRequestException('Invalid latitude or longitude');
        }
    
        return this.pharmacyService.getNearbyGuardPharmacies(latitude, longitude);
    }
    

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<PharmacyResponseDto> {
        try {
            const pharmacy = await this.pharmacyService.getPharmacyById(id);
            if (!pharmacy) {
                throw new HttpException('Pharmacy not found', HttpStatus.NOT_FOUND);
            }
            return new PharmacyResponseDto(pharmacy);
        } catch (error) {
            throw new HttpException(
                error.message || 'Failed to fetch pharmacy',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    
} 