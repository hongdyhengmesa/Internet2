import { Injectable } from '@nestjs/common';
import { Receipts } from './receipts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class ReceiptsService {
  constructor(
    @InjectRepository(Receipts)
    private readonly receiptsRepository: Repository<Receipts>,
    private readonly notifications: NotificationsService,
  ) {}

  async findAll() {
    return this.receiptsRepository.find({ order: { issuedAt: 'DESC' } });
  }

  async findOne(id: number) {
    const receipt = await this.receiptsRepository.findOne({ where: { id } });
    if (!receipt) {
      throw new Error(`Receipt with id ${id} not found`);
    }
    return receipt;
  }

  async create(dto: CreateReceiptDto) {
    const receipt = this.receiptsRepository.create({
      issuedAt: new Date(dto.issuedAt),
      name: dto.name,
      price: dto.price,
    });

    const saved = await this.receiptsRepository.save(receipt);

    this.notifications.notify('receipt_created', {
      receiptId: saved.id,
      price: saved.price,
    });

    return saved;
  }

  async update(id: number, dto: UpdateReceiptDto) {
    const receipt = await this.findOne(id);
    if (dto.issuedAt !== undefined) {
      receipt.issuedAt = new Date(dto.issuedAt);
    }
    if (dto.name !== undefined) {
      receipt.name = dto.name;
    }
    if (dto.price !== undefined) {
      receipt.price = dto.price;
    }

    return this.receiptsRepository.save(receipt);
  }

  async remove(id: number) {
    const receipt = await this.findOne(id);
    await this.receiptsRepository.remove(receipt);
    return { deleted: true, id };
  }
}