# 📧 Configuración del Formulario de Contacto

El formulario de contacto está listo para usar con **Web3Forms**, un servicio gratuito que envía los mensajes directamente a tu email.

## 🚀 Configuración Rápida (5 minutos)

### Opción 1: Web3Forms (Recomendado - Gratis)

1. **Obtén tu Access Key gratis:**
   - Ve a [web3forms.com](https://web3forms.com)
   - Ingresa tu email (pablooalcaldegarcia@gmail.com)
   - Recibirás un email con tu `Access Key`

2. **Configura el formulario:**
   - Abre `src/components/Contact.astro`
   - Busca la línea 246: `access_key: 'YOUR_ACCESS_KEY_HERE'`
   - Reemplaza `YOUR_ACCESS_KEY_HERE` con tu clave real

3. **¡Listo!** El formulario ya enviará mensajes a tu email.

**Ejemplo:**
```javascript
access_key: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6'
```

### Características de Web3Forms:
- ✅ 100% Gratuito
- ✅ Sin límite de envíos
- ✅ Sin publicidad
- ✅ Protección anti-spam
- ✅ Notificaciones por email
- ✅ No requiere cuenta ni registro

---

## 🔄 Opciones Alternativas

### Opción 2: Formspree

1. Regístrate en [formspree.io](https://formspree.io)
2. Crea un nuevo formulario
3. Copia tu endpoint URL
4. Modifica `src/components/Contact.astro`:

```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: {
    'Accept': 'application/json'
  },
  body: JSON.stringify(data)
});
```

**Plan gratuito:** 50 envíos/mes

### Opción 3: Netlify Forms (si despliegas en Netlify)

1. Añade el atributo `data-netlify="true"` al formulario:

```html
<form id="contact-form" data-netlify="true" name="contact">
```

2. Netlify detectará automáticamente el formulario
3. Los mensajes aparecerán en tu dashboard de Netlify

**Plan gratuito:** 100 envíos/mes

### Opción 4: EmailJS

1. Regístrate en [emailjs.com](https://www.emailjs.com/)
2. Configura un servicio de email
3. Instala el SDK:

```bash
npm install @emailjs/browser
```

4. Usa su API en el formulario

**Plan gratuito:** 200 envíos/mes

---

## 🛠️ Personalización Avanzada

### Añadir campo de empresa

En `src/components/Contact.astro`, añade después del campo de teléfono:

```html
<div>
  <label for="company" class="block text-sm font-medium text-gray-300 mb-2">
    Empresa
  </label>
  <input
    type="text"
    id="company"
    name="company"
    class="w-full px-4 py-3 bg-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
    placeholder="Nombre de tu empresa"
  />
</div>
```

Y añade en el objeto `data`:

```javascript
const data = {
  name: formData.get('name'),
  email: formData.get('email'),
  phone: formData.get('phone'),
  company: formData.get('company'), // ← Añadir esta línea
  subject: formData.get('subject'),
  message: formData.get('message'),
};
```

### Añadir reCAPTCHA (protección anti-spam)

Web3Forms soporta Google reCAPTCHA v3:

1. Obtén las claves en [google.com/recaptcha](https://www.google.com/recaptcha/admin)
2. Añade en el objeto de datos:

```javascript
body: JSON.stringify({
  access_key: 'tu_access_key',
  botcheck: false, // Evita bots simples
  ...data,
})
```

### Redirección después del envío

Añade en el `if (response.ok)`:

```javascript
if (response.ok && result.success) {
  formMessage.textContent = '¡Mensaje enviado con éxito!';
  formMessage.className = 'p-4 rounded-lg bg-green-500/20 border border-green-500 text-green-400';
  formMessage.classList.remove('hidden');
  form.reset();
  
  // Redireccionar después de 2 segundos
  setTimeout(() => {
    window.location.href = '/gracias'; // Crea esta página
  }, 2000);
}
```

---

## 🎨 Campos Disponibles

El formulario incluye:

- **Nombre** (obligatorio)
- **Email** (obligatorio)
- **Teléfono** (opcional)
- **Asunto** (obligatorio)
- **Mensaje** (obligatorio)

### Estados del formulario:

- ⏳ **Enviando**: Muestra spinner de carga
- ✅ **Éxito**: Mensaje verde de confirmación
- ❌ **Error**: Mensaje rojo con opción de contacto directo

---

## 📊 Analíticas

### Seguimiento con Google Analytics

Si quieres trackear los envíos de formularios, añade en el éxito:

```javascript
if (response.ok && result.success) {
  // Enviar evento a Google Analytics
  if (window.gtag) {
    window.gtag('event', 'form_submit', {
      'event_category': 'Contact',
      'event_label': 'Contact Form'
    });
  }
  
  // ... resto del código
}
```

---

## 🔒 Seguridad

### Protección contra spam

Web3Forms incluye:
- Honeypot fields
- Time-based validation
- Rate limiting
- Email verification

### Mejores prácticas:

1. **No expongas claves privadas** en el código del cliente
2. **Usa variables de entorno** para datos sensibles (aunque Web3Forms access_key está diseñado para ser público)
3. **Valida en el servidor** (Web3Forms lo hace por ti)

---

## 🐛 Solución de Problemas

### El formulario no envía

1. **Verifica la Access Key:**
   - Asegúrate de que está entre comillas
   - Sin espacios extras
   - Formato correcto

2. **Revisa la consola del navegador:**
   - Presiona F12
   - Ve a la pestaña "Console"
   - Busca errores en rojo

3. **Verifica tu conexión:**
   - El formulario necesita internet para enviar

### No recibo emails

1. **Verifica tu carpeta de spam**
2. **Confirma el email en Web3Forms**
3. **Revisa que el Access Key sea correcto**

### Error de CORS

Si usas otro servicio y ves error de CORS, el servicio debe tener habilitado CORS. Web3Forms lo tiene por defecto.

---

## 📧 Ejemplo de Email que Recibirás

```
De: Web3Forms <noreply@web3forms.com>
Para: pablooalcaldegarcia@gmail.com
Asunto: Nuevo mensaje de contacto - [Asunto del visitante]

Nombre: Juan Pérez
Email: juan@ejemplo.com
Teléfono: 123456789
Asunto: Consulta sobre desarrollo web

Mensaje:
Hola Pablo, me gustaría contratarte para...
```

---

## 💡 Consejos

1. **Responde rápido:** Configura notificaciones push en tu email
2. **Auto-respuesta:** Web3Forms Pro permite enviar emails automáticos
3. **CRM:** Integra con Zapier para enviar contactos a tu CRM
4. **Backup:** Los mensajes también quedan en el dashboard de Web3Forms

---

¿Necesitas ayuda? Revisa la [documentación de Web3Forms](https://docs.web3forms.com) o prueba otra de las opciones alternativas.

