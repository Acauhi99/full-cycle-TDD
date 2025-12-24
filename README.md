# Sistema de Reservas - Testes

## Requisitos

- Node.js v22.20.0
- npm
- Python 3.12+ com setuptools

## Instalação

```bash
npm install
```

## Executar Testes

```bash
npm test
```

## Estrutura de Testes

### Testes Unitários

#### Mappers
- `src/infrastructure/persistence/mappers/property_mapper.test.ts`
  - Conversão PropertyEntity para Property
  - Conversão Property para PropertyEntity
  - Validação de campos obrigatórios

- `src/infrastructure/persistence/mappers/booking_mapper.test.ts`
  - Conversão BookingEntity para Booking
  - Conversão Booking para BookingEntity
  - Validação de campos obrigatórios

#### Políticas de Reembolso
- `src/domain/cancelation/refund_rule_factory.test.ts`
  - FullRefund: cancelamento com mais de 7 dias de antecedência
  - PartialRefund: cancelamento entre 1 e 7 dias de antecedência
  - NoRefund: cancelamento com menos de 1 dia de antecedência

#### Serviços
- `src/application/services/booking_service.test.ts`
  - Criação de reservas
  - Cancelamento de reservas
  - Validações de propriedade e usuário
  - Erro ao cancelar reserva inexistente

- `src/application/services/property_service.test.ts`
- `src/application/services/user_service.test.ts`

#### Entidades
- `src/domain/entities/property.test.ts`
- `src/domain/entities/booking.test.ts`
- `src/domain/entities/user.test.ts`

#### Value Objects
- `src/domain/value_objects/date_range.test.ts`

### Testes de Integração

#### Repositórios TypeORM
- `src/infrastructure/repositories/typeorm_user_repository.test.ts`
- `src/infrastructure/repositories/typeorm_property_repository.test.ts`
- `src/infrastructure/repositories/typeorm_booking_repository.test.ts`

### Testes E2E

#### UserController
- `src/infrastructure/web/user_controller_e2e.test.ts`
  - POST /users - criação com sucesso
  - POST /users - erro 400 ao enviar nome vazio

#### PropertyController
- `src/infrastructure/web/property_controller_e2e.test.ts`
  - POST /properties - criação com sucesso
  - POST /properties - erro 400 ao enviar nome vazio
  - POST /properties - erro 400 ao enviar maxGuests <= 0
  - POST /properties - erro 400 ao enviar basePricePerNight ausente

#### BookingController
- `src/infrastructure/web/booking_controller_e2e.test.ts`
  - POST /bookings - criação com sucesso
  - POST /bookings - validações de data inválida
  - POST /bookings - validação de número de hóspedes
  - POST /bookings - validação de propertyId inválido
  - POST /bookings/:id/cancel - cancelamento com sucesso
  - POST /bookings/:id/cancel - erro ao cancelar reserva inexistente

## Tecnologias

- Jest: framework de testes
- TypeORM: ORM com better-sqlite3
- Supertest: testes HTTP
- Better-SQLite3: banco de dados em memória para testes

## Cobertura

Total: 67 testes
- 16 suítes de teste
- Cobertura de testes unitários, integração e E2E
