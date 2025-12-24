import { BookingMapper } from "./booking_mapper";
import { BookingEntity } from "../entities/booking_entity";
import { PropertyEntity } from "../entities/property_entity";
import { UserEntity } from "../entities/user_entity";
import { Booking } from "../../../domain/entities/booking";
import { Property } from "../../../domain/entities/property";
import { User } from "../../../domain/entities/user";
import { DateRange } from "../../../domain/value_objects/date_range";

describe("BookingMapper", () => {
  it("deve converter BookingEntity em Booking corretamente", () => {
    const propertyEntity = new PropertyEntity();
    propertyEntity.id = "1";
    propertyEntity.name = "Casa na Praia";
    propertyEntity.description = "Vista para o mar";
    propertyEntity.maxGuests = 6;
    propertyEntity.basePricePerNight = 200;

    const userEntity = new UserEntity();
    userEntity.id = "1";
    userEntity.name = "João Silva";

    const entity = new BookingEntity();
    entity.id = "1";
    entity.property = propertyEntity;
    entity.guest = userEntity;
    entity.startDate = new Date("2024-12-20");
    entity.endDate = new Date("2024-12-25");
    entity.guestCount = 4;
    entity.totalPrice = 1000;
    entity.status = "CONFIRMED";

    const domain = BookingMapper.toDomain(entity);

    expect(domain).toBeInstanceOf(Booking);
    expect(domain.getId()).toBe("1");
    expect(domain.getProperty().getId()).toBe("1");
    expect(domain.getGuest().getId()).toBe("1");
    expect(domain.getGuestCount()).toBe(4);
    expect(domain.getTotalPrice()).toBe(1000);
    expect(domain.getStatus()).toBe("CONFIRMED");
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity", () => {
    const propertyEntity = new PropertyEntity();
    propertyEntity.id = "1";
    propertyEntity.name = "Casa na Praia";
    propertyEntity.description = "Vista para o mar";
    propertyEntity.maxGuests = 6;
    propertyEntity.basePricePerNight = 200;

    const userEntity = new UserEntity();
    userEntity.id = "1";
    userEntity.name = "João Silva";

    const entity = new BookingEntity();
    entity.id = "1";
    entity.property = propertyEntity;
    entity.guest = userEntity;
    entity.startDate = new Date("2024-12-25");
    entity.endDate = new Date("2024-12-20");
    entity.guestCount = 0;
    entity.totalPrice = 1000;
    entity.status = "CONFIRMED";

    expect(() => BookingMapper.toDomain(entity)).toThrow();
  });

  it("deve converter Booking para BookingEntity corretamente", () => {
    const property = new Property(
      "1",
      "Casa na Praia",
      "Vista para o mar",
      6,
      200
    );
    const user = new User("1", "João Silva");
    const dateRange = new DateRange(
      new Date("2024-12-20"),
      new Date("2024-12-25")
    );
    const domain = new Booking("1", property, user, dateRange, 4);

    const entity = BookingMapper.toPersistence(domain);

    expect(entity).toBeInstanceOf(BookingEntity);
    expect(entity.id).toBe("1");
    expect(entity.property.id).toBe("1");
    expect(entity.guest.id).toBe("1");
    expect(entity.guestCount).toBe(4);
    expect(entity.status).toBe("CONFIRMED");
  });
});
