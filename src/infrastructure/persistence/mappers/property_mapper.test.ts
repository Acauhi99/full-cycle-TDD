import { PropertyMapper } from "./property_mapper";
import { PropertyEntity } from "../entities/property_entity";
import { Property } from "../../../domain/entities/property";

describe("PropertyMapper", () => {
  it("deve converter PropertyEntity em Property corretamente", () => {
    const entity = new PropertyEntity();
    entity.id = "1";
    entity.name = "Casa na Praia";
    entity.description = "Vista para o mar";
    entity.maxGuests = 6;
    entity.basePricePerNight = 200;

    const domain = PropertyMapper.toDomain(entity);

    expect(domain).toBeInstanceOf(Property);
    expect(domain.getId()).toBe("1");
    expect(domain.getName()).toBe("Casa na Praia");
    expect(domain.getDescription()).toBe("Vista para o mar");
    expect(domain.getMaxGuests()).toBe(6);
    expect(domain.getBasePricePerNight()).toBe(200);
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity", () => {
    const entity = new PropertyEntity();
    entity.id = "1";
    entity.name = "";
    entity.description = "Vista para o mar";
    entity.maxGuests = 6;
    entity.basePricePerNight = 200;

    expect(() => PropertyMapper.toDomain(entity)).toThrow();
  });

  it("deve converter Property para PropertyEntity corretamente", () => {
    const domain = new Property(
      "1",
      "Casa na Praia",
      "Vista para o mar",
      6,
      200
    );

    const entity = PropertyMapper.toPersistence(domain);

    expect(entity).toBeInstanceOf(PropertyEntity);
    expect(entity.id).toBe("1");
    expect(entity.name).toBe("Casa na Praia");
    expect(entity.description).toBe("Vista para o mar");
    expect(entity.maxGuests).toBe(6);
    expect(entity.basePricePerNight).toBe(200);
  });
});
