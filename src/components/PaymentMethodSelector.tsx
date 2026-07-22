"use client";

import { useState } from "react";
import { CreditCard, DollarSign, Smartphone, Phone } from "lucide-react";

export type PaymentMethod = "STRIPE" | "PAYPAL" | "ORANGE_MONEY" | "MTN_MOMO";

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
  disabled?: boolean;
}

const paymentMethods = [
  {
    id: "STRIPE" as PaymentMethod,
    name: "Credit/Debit Card",
    description: "Pay securely with Visa, Mastercard, or American Express",
    icon: CreditCard,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
  },
  {
    id: "PAYPAL" as PaymentMethod,
    name: "PayPal",
    description: "Fast and secure payment with your PayPal account",
    icon: DollarSign,
    color: "from-blue-700 to-blue-800",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
  },
  {
    id: "ORANGE_MONEY" as PaymentMethod,
    name: "Orange Money",
    description: "Pay with your Orange Money mobile wallet",
    icon: Smartphone,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
  },
  {
    id: "MTN_MOMO" as PaymentMethod,
    name: "MTN Mobile Money",
    description: "Pay with your MTN Mobile Money account",
    icon: Phone,
    color: "from-yellow-500 to-yellow-600",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-700",
  },
];

export default function PaymentMethodSelector({
  selectedMethod,
  onSelect,
  disabled = false,
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Select Payment Method
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;

          return (
            <button
              key={method.id}
              onClick={() => !disabled && onSelect(method.id)}
              disabled={disabled}
              className={`
                relative p-4 rounded-xl border-2 transition-all
                ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}
                ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`
                    p-2 rounded-lg bg-gradient-to-br ${method.color}
                  `}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-gray-900">{method.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {method.description}
                  </p>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
