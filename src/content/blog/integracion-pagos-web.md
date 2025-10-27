---
title: "Integración de Pagos en Tu Web: Guía Completa Stripe, PayPal y Más"
description: "Todo sobre pasarelas de pago para tu web. Comparativa, costos, seguridad y cómo implementar pagos online correctamente."
pubDate: 2025-10-27T00:00:00.000Z
tags: ["Payments", "E-commerce", "Web Development", "Business", "Stripe", "PayPal", "Security"]
---

# Integración de Pagos en Tu Web: Guía Completa 2025

El 70% de carritos abandonados se deben a procesos de pago complicados o falta de confianza. Una buena pasarela de pagos puede aumentar tus conversiones un 35-50%.

## Pasarelas de Pago Principales

### Stripe ⭐⭐⭐⭐⭐

```javascript
const stripePros = {
  pros: [
    "Mejor experiencia de desarrollador",
    "Documentación excelente",
    "APIs modernas y potentes",
    "Checkout embebido y hosted",
    "Subscripciones nativas",
    "Soporte de 135+ monedas",
    "Fraude detection incluido"
  ],
  contras: [
    "Requiere conocimientos técnicos",
    "No tan conocido para usuarios finales"
  ],
  costos: {
    transaccion: "1.4% + 0.25€",
    internacional: "+1.5%",
    subscripción: "0.5% adicional",
    setup: "0€"
  },
  ideal: "E-commerce modernos, SaaS, subscripciones"
}
```

### PayPal ⭐⭐⭐⭐

```javascript
const paypalInfo = {
  pros: [
    "Muy conocido (confianza)",
    "No requiere tarjeta (saldo PayPal)",
    "Protección comprador/vendedor",
    "Setup muy simple",
    "Aceptado globalmente"
  ],
  contras: [
    "UX puede ser disruptiva (redirige)",
    "Comisiones más altas",
    "Retención de fondos sin aviso",
    "Soporte regular"
  ],
  costos: {
    nacional: "2.9% + 0.35€",
    internacional: "3.4% + 0.35€ + conversión",
    setup: "0€"
  },
  ideal: "PyMEs, primeros pasos e-commerce"
}
```

### Redsys (España) ⭐⭐⭐

```javascript
const redsysInfo = {
  pros: [
    "Estándar bancario España",
    "Integra con tu banco",
    "Comisiones negociables",
    "3D Secure nativo"
  ],
  contras: [
    "Setup complejo",
    "Documentación confusa",
    "UX anticuada",
    "Requiere contrato con banco"
  ],
  costos: {
    transaccion: "0.8% - 1.5% (negociable)",
    setup: "100€ - 500€",
    mantenimiento: "20€ - 50€/mes"
  },
  ideal: "Empresas establecidas, volumen alto"
}
```

### Comparativa Rápida

```markdown
| Pasarela | Comisión | Setup | Ideal Para |
|----------|----------|-------|------------|
| Stripe | 1.4% + 0.25€ | 0€ | E-commerce moderno, SaaS |
| PayPal | 2.9% + 0.35€ | 0€ | PyMEs, inicial |
| Redsys | 0.8-1.5% | 500€ | Volumen alto España |
| Square | 1.75% + 0.15€ | 0€ | Retail + Online |
| Bizum | 0.5% | Variable | Pagos P2P España |
```

## Implementación Stripe (Recomendado)

### Checkout Embebido

```javascript
// Frontend - Crear sesión de pago
const createCheckoutSession = async (items) => {
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items })
  })
  
  const { sessionId } = await response.json()
  
  // Redirigir a Stripe Checkout
  const stripe = Stripe('pk_live_xxxxx')
  const { error } = await stripe.redirectToCheckout({ sessionId })
  
  if (error) {
    console.error('Error:', error)
  }
}

// Backend - Endpoint Node.js/Express
app.post('/api/create-checkout-session', async (req, res) => {
  const { items } = req.body
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          images: [item.image]
        },
        unit_amount: item.price * 100 // céntimos
      },
      quantity: item.quantity
    })),
    mode: 'payment',
    success_url: `${process.env.DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.DOMAIN}/cancel`,
    shipping_address_collection: {
      allowed_countries: ['ES', 'PT', 'FR']
    },
    metadata: {
      orderId: generateOrderId()
    }
  })
  
  res.json({ sessionId: session.id })
})

// Webhook para confirmar pago
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature']
  
  let event
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }
  
  // Handle evento
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    
    // Marcar pedido como pagado
    await fulfillOrder(session)
  }
  
  res.json({ received: true })
})
```

### Payment Element (Custom)

```javascript
// Más control sobre el diseño
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'

const stripePromise = loadStripe('pk_live_xxxxx')

function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!stripe || !elements) return
    
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'https://tu-sitio.com/order-complete'
      }
    })
    
    if (error) {
      setErrorMessage(error.message)
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe}>Pagar</button>
    </form>
  )
}

// En tu componente principal
function Checkout() {
  const [clientSecret, setClientSecret] = useState('')
  
  useEffect(() => {
    // Crear Payment Intent
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 5000 }) // 50€
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret))
  }, [])
  
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  )
}
```

## Seguridad (PCI DSS Compliance)

### Nunca Hagas Esto

```javascript
// ❌ NUNCA guardes datos de tarjeta
const badPractice = {
  cardNumber: '4242424242424242', // ILEGAL
  cvv: '123', // ILEGAL
  expiry: '12/25' // ILEGAL
}

// ❌ NUNCA envíes datos de tarjeta a tu servidor
fetch('/api/payment', {
  method: 'POST',
  body: JSON.stringify({
    cardNumber: document.getElementById('card').value // PELIGROSO
  })
})
```

### Hazlo Correctamente

```javascript
// ✅ Usa tokens/Payment Methods
const stripe = Stripe('pk_live_xxxxx')

// Los datos de tarjeta van directamente a Stripe
const { paymentMethod, error } = await stripe.createPaymentMethod({
  type: 'card',
  card: cardElement, // Elemento de Stripe, no input HTML
  billing_details: {
    name: customerName,
    email: customerEmail
  }
})

// Solo envías el ID del payment method a tu servidor
fetch('/api/process-payment', {
  method: 'POST',
  body: JSON.stringify({
    paymentMethodId: paymentMethod.id, // Solo el ID, seguro
    amount: 5000
  })
})
```

## Subscripciones Recurrentes

### Setup con Stripe

```javascript
// Crear un producto y precio
const product = await stripe.products.create({
  name: 'Plan Pro Mensual',
  description: 'Acceso completo a todas las funcionalidades'
})

const price = await stripe.prices.create({
  product: product.id,
  unit_amount: 2900, // 29€
  currency: 'eur',
  recurring: {
    interval: 'month'
  }
})

// Crear subscripción
const subscription = await stripe.subscriptions.create({
  customer: customerId,
  items: [{ price: price.id }],
  payment_behavior: 'default_incomplete',
  expand: ['latest_invoice.payment_intent']
})

// Manejar cancelaciones
await stripe.subscriptions.update(subscriptionId, {
  cancel_at_period_end: true
})

// Cambiar plan
await stripe.subscriptions.update(subscriptionId, {
  items: [{
    id: subscriptionItem.id,
    price: newPriceId
  }],
  proration_behavior: 'create_prorations' // Prorratear diferencia
})
```

## Prevención de Fraude

### Stripe Radar (Incluido)

```javascript
const paymentIntentConfig = {
  amount: 5000,
  currency: 'eur',
  
  // Radar analiza automáticamente
  metadata: {
    orderId: '123',
    customerEmail: 'customer@email.com'
  },
  
  // Forzar 3D Secure para pagos arriesgados
  payment_method_options: {
    card: {
      request_three_d_secure: 'automatic' // o 'any'
    }
  }
}

// Revisar nivel de riesgo
const paymentIntent = await stripe.paymentIntents.retrieve(id)
const riskLevel = paymentIntent.charges.data[0].outcome.risk_level
// 'normal', 'elevated', 'highest'

if (riskLevel === 'highest') {
  // Revisar manualmente o rechazar
}
```

### Reglas Personalizadas

```markdown
**Block automático si:**
- Email temporal (guerrillamail, etc.)
- IP de país no vendemos
- Múltiples tarjetas rechazadas
- Velocidad sospechosa (10 intentos/minuto)

**Review manual si:**
- Primera compra > 200€
- Envío != Facturación (países diferentes)
- Compra muy por encima de ticket promedio
```

## Costos Reales

### Ejemplo E-commerce

```javascript
const costosEcommerce = {
  ventas: {
    mensuales: 50000, // 50K€/mes
    tickets: 200, // 200 pedidos
    promedio: 250 // 250€ pedido promedio
  },
  
  conStripe: {
    comision: "(50.000 * 0.014) + (200 * 0.25) = 750€",
    porcentaje: "1.5% de ventas"
  },
  
  conPayPal: {
    comision: "(50.000 * 0.029) + (200 * 0.35) = 1.520€",
    porcentaje: "3% de ventas"
  },
  
  conRedsys: {
    comision: "(50.000 * 0.01) + 30€ mensualidad = 530€",
    porcentaje: "1.06% de ventas",
    nota: "Requiere setup 500€ inicial"
  },
  
  ahorroStripeVsPayPal: "770€/mes = 9.240€/año"
}
```

## Testing

### Tarjetas de Prueba Stripe

```javascript
const testCards = {
  success: {
    number: '4242 4242 4242 4242',
    description: 'Siempre aprueba'
  },
  
  decline: {
    number: '4000 0000 0000 0002',
    description: 'Siempre rechaza'
  },
  
  authentication: {
    number: '4000 0027 6000 3184',
    description: 'Requiere 3D Secure'
  },
  
  insufficient: {
    number: '4000 0000 0000 9995',
    description: 'Fondos insuficientes'
  }
}

// Cualquier CVV y fecha futura funcionan en modo test
```

## Checklist Implementación

```markdown
## Básico ✅
- [ ] Pasarela elegida y cuenta creada
- [ ] API keys (test y live) obtenidas
- [ ] SSL certificado instalado (HTTPS obligatorio)
- [ ] Términos y condiciones actualizados
- [ ] Política de devoluciones clara
- [ ] Emails transaccionales configurados

## Seguridad ✅
- [ ] Nunca guardamos datos de tarjeta
- [ ] PCI DSS compliance verificado
- [ ] Webhooks con verificación de firma
- [ ] 3D Secure habilitado
- [ ] Rate limiting en endpoints
- [ ] Logs de todas las transacciones

## UX ✅
- [ ] Loading states claros
- [ ] Mensajes de error útiles
- [ ] Confirmación inmediata
- [ ] Email confirmación enviado
- [ ] Redirección después de pago
- [ ] Mobile optimizado

## Legal ✅
- [ ] Política de privacidad (GDPR)
- [ ] Aviso legal completo
- [ ] Política de cookies
- [ ] IVA incluido en precio (B2C España)
- [ ] Facturación automática

## Testing ✅
- [ ] Pagos exitosos
- [ ] Pagos rechazados
- [ ] 3D Secure
- [ ] Webhooks funcionando
- [ ] Emails llegando
- [ ] Múltiples navegadores
- [ ] Mobile devices
```

## Solución de Problemas Comunes

### Pagos Rechazados

```javascript
const handleDeclineReasons = {
  'insufficient_funds': {
    mensaje: "Tu tarjeta no tiene fondos suficientes",
    accion: "Usa otra tarjeta o método de pago"
  },
  
  'card_declined': {
    mensaje: "Tu banco rechazó el pago",
    accion: "Contacta a tu banco o usa otra tarjeta"
  },
  
  'expired_card': {
    mensaje: "Tu tarjeta ha expirado",
    accion: "Actualiza los datos de tu tarjeta"
  },
  
  'incorrect_cvc': {
    mensaje: "El código CVV es incorrecto",
    accion: "Verifica el código de 3 dígitos"
  },
  
  'processing_error': {
    mensaje: "Error procesando el pago",
    accion: "Intenta de nuevo en unos minutos"
  }
}

// Mostrar mensaje amigable al usuario
if (error.decline_code) {
  const userMessage = handleDeclineReasons[error.decline_code]
  showError(userMessage.mensaje)
}
```

## Conclusión

Una buena integración de pagos es crítica para tu negocio online:

✅ **Confianza**: SSL + Pasarela conocida = +35% conversión
✅ **Seguridad**: PCI DSS compliance protege tu negocio
✅ **UX**: Proceso fluido = menos abandono
✅ **Costos**: Elegir bien ahorra miles al año

**Recomendación:**
- **Empezando**: Stripe o PayPal
- **Volumen alto**: Redsys + Stripe
- **SaaS**: Stripe (subscripciones nativas)
- **Marketplaces**: Stripe Connect

¿Necesitas integrar pagos en tu web?

**Solicita un presupuesto de integración**

---

*"El mejor proceso de pago es el que el cliente ni nota."*

