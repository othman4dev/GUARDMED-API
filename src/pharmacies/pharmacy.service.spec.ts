import { Test, TestingModule } from '@nestjs/testing';
import { PharmacyService } from './pharmacy.service';
import { PharmacyRepository } from '../repositories/pharmacy.repository';

describe('PharmacyService', () => {
  let service: PharmacyService;
  let repository: PharmacyRepository;

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
      providers: [
        PharmacyService,
        {
          provide: PharmacyRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PharmacyService>(PharmacyService);
    repository = module.get<PharmacyRepository>(PharmacyRepository);
  });

  describe('createPharmacy', () => {
    it('should create a pharmacy successfully', async () => {
      const createPharmacyDto = {
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

      jest.spyOn(repository, 'create').mockResolvedValue('newPharmacyId');

      const result = await service.createPharmacy(createPharmacyDto);

      expect(result).toBe('newPharmacyId');
    });
  });

  describe('getAllPharmacies', () => {
    it('should return all pharmacies', async () => {
      const mockPharmacies = [mockPharmacy, { ...mockPharmacy, id: '2' }];

      jest.spyOn(repository, 'findAll').mockResolvedValue(mockPharmacies);

      const result = await service.getAllPharmacies();

      expect(result).toEqual(mockPharmacies);
    });
  });

  describe('getPharmacyById', () => {
    it('should return a pharmacy by id', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(mockPharmacy);

      const result = await service.getPharmacyById('1');

      expect(result).toEqual(mockPharmacy);
      expect(repository.findById).toHaveBeenCalledWith('1');
    });

    it('should return null if pharmacy not found', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(null);

      const result = await service.getPharmacyById('999');

      expect(result).toBeNull();
    });
  });

  describe('updatePharmacy', () => {
    it('should update a pharmacy successfully', async () => {
      const updatePharmacyDto = {
        name: 'Updated Pharmacy',
      };

      jest.spyOn(repository, 'findById').mockResolvedValue(mockPharmacy);
      jest.spyOn(repository, 'update').mockResolvedValue();
      jest.spyOn(repository, 'findById').mockResolvedValue({
        ...mockPharmacy,
        ...updatePharmacyDto,
      });

      const result = await service.updatePharmacy('1', updatePharmacyDto);

      expect(result).toBeDefined();
      expect(result.name).toBe(updatePharmacyDto.name);
    });

    it('should throw error if pharmacy not found', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(null);

      await expect(
        service.updatePharmacy('999', { name: 'Test' }),
      ).rejects.toThrow('Pharmacy with id 999 not found');
    });
  });

  describe('deletePharmacy', () => {
    it('should delete a pharmacy successfully', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue();

      await expect(service.deletePharmacy('1')).resolves.not.toThrow();
      expect(repository.delete).toHaveBeenCalledWith('1');
    });
  });
});
