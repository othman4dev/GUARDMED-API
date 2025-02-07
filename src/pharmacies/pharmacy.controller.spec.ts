import { Test, TestingModule } from '@nestjs/testing';
import { PharmacyController } from './pharmacy.controller';
import { PharmacyService } from './pharmacy.service';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';
import { HttpException } from '@nestjs/common';

describe('PharmacyController', () => {
  let controller: PharmacyController;
  let service: PharmacyService;

  const mockPharmacy = {
    id: '1',
    name: 'New Pharmacy',
    address: '123 Test St',
    phone: '1234567890',
    location: {
      lat: 48.8566,
      lng: 2.3522,
    },
    openingHours: {
      open_at: '09:00',
      close_at: '18:00',
    },
    is_guard: false,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PharmacyController],
      providers: [
        {
          provide: PharmacyService,
          useValue: {
            createPharmacy: jest.fn().mockResolvedValue('1'),
            getAllPharmacies: jest.fn().mockResolvedValue([mockPharmacy]),
            getPharmacyById: jest.fn().mockResolvedValue(mockPharmacy),
            updatePharmacy: jest.fn().mockResolvedValue(mockPharmacy),
            deletePharmacy: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PharmacyController>(PharmacyController);
    service = module.get<PharmacyService>(PharmacyService);
  });

  describe('create', () => {
    it('should create a pharmacy', async () => {
      const createPharmacyDto: CreatePharmacyDto = {
        name: 'New Pharmacy',
        address: '123 Main St',
        phone: '0123456789',
        location: {
          lat: 48.8566,
          lng: 2.3522,
        },
        openingHours: {
          open_at: '09:30',
          close_at: '18:30',
        },
        is_guard: false,
      };

      const result = await controller.create(createPharmacyDto);

      expect(service.createPharmacy).toHaveBeenCalledWith(createPharmacyDto);
      expect(result).toEqual({ id: '1' });
    });

    it('should handle errors when creating pharmacy', async () => {
      jest.spyOn(service, 'createPharmacy').mockRejectedValue(new Error());

      await expect(controller.create({} as CreatePharmacyDto)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('findAll', () => {
    it('should return array of pharmacies', async () => {
      const result = await controller.findAll();

      expect(service.getAllPharmacies).toHaveBeenCalled();
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(mockPharmacy.id);
    });

    it('should handle errors when fetching pharmacies', async () => {
      jest.spyOn(service, 'getAllPharmacies').mockRejectedValue(new Error());

      await expect(controller.findAll()).rejects.toThrow(HttpException);
    });
  });

  describe('findOne', () => {
    it('should return a pharmacy', async () => {
      const result = await controller.findOne('1');

      expect(service.getPharmacyById).toHaveBeenCalledWith('1');
      expect(result.id).toBe(mockPharmacy.id);
    });

    it('should handle not found pharmacy', async () => {
      jest.spyOn(service, 'getPharmacyById').mockResolvedValue(null);

      await expect(controller.findOne('999')).rejects.toThrow(HttpException);
    });
  });

  describe('update', () => {
    it('should update a pharmacy', async () => {
      const updatePharmacyDto: UpdatePharmacyDto = {
        name: 'Updated Pharmacy',
      };

      const result = await controller.update('1', updatePharmacyDto);

      expect(service.updatePharmacy).toHaveBeenCalledWith(
        '1',
        updatePharmacyDto,
      );
      expect(result.message).toBe('Pharmacy updated successfully');
    });
  });

  describe('remove', () => {
    it('should delete a pharmacy', async () => {
      const result = await controller.remove('1');

      expect(service.deletePharmacy).toHaveBeenCalledWith('1');
      expect(result.message).toBe('Pharmacy deleted successfully');
    });
  });
});
