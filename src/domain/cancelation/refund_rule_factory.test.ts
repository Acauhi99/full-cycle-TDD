import { RefundRuleFactory } from "./refund_rule_factory";
import { FullRefund } from "./full_refund";
import { PartialRefund } from "./partial_refund";
import { NoRefund } from "./no_refund copy";

describe("RefundRuleFactory", () => {
  it("deve retornar FullRefund quando a reserva for cancelada com mais de 7 dias de antecedência", () => {
    const refundRule = RefundRuleFactory.getRefundRule(8);
    expect(refundRule).toBeInstanceOf(FullRefund);
  });

  it("deve retornar PartialRefund quando a reserva for cancelada entre 1 e 7 dias de antecedência", () => {
    const refundRule1 = RefundRuleFactory.getRefundRule(1);
    expect(refundRule1).toBeInstanceOf(PartialRefund);

    const refundRule7 = RefundRuleFactory.getRefundRule(7);
    expect(refundRule7).toBeInstanceOf(PartialRefund);

    const refundRule5 = RefundRuleFactory.getRefundRule(5);
    expect(refundRule5).toBeInstanceOf(PartialRefund);
  });

  it("deve retornar NoRefund quando a reserva for cancelada com menos de 1 dia de antecedência", () => {
    const refundRule = RefundRuleFactory.getRefundRule(0);
    expect(refundRule).toBeInstanceOf(NoRefund);
  });
});
