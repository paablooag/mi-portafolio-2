#!/bin/bash

# Script para configurar indexación automática con cron
# Ejecutar: chmod +x scripts/setup-cron.sh && ./scripts/setup-cron.sh

echo "🚀 Configurando indexación automática..."

# Crear directorio de logs si no existe
mkdir -p logs

# Crear script de indexación
cat > scripts/daily-index.sh << 'EOF'
#!/bin/bash

# Script de indexación diaria
LOG_FILE="logs/indexing-$(date +%Y-%m-%d).log"
SITE_URL="https://pabloalcalde.dev"

echo "$(date): Iniciando indexación automática" >> $LOG_FILE

# Ping sitemap a Google
curl -s "https://www.google.com/ping?sitemap=${SITE_URL}/sitemap-index.xml" >> $LOG_FILE 2>&1
echo "$(date): Sitemap enviado a Google" >> $LOG_FILE

# Ping sitemap a Bing
curl -s "https://www.bing.com/ping?sitemap=${SITE_URL}/sitemap-index.xml" >> $LOG_FILE 2>&1
echo "$(date): Sitemap enviado a Bing" >> $LOG_FILE

# Verificar que el sitio esté accesible
curl -s -o /dev/null -w "%{http_code}" $SITE_URL >> $LOG_FILE 2>&1
echo "$(date): Verificación de accesibilidad completada" >> $LOG_FILE

echo "$(date): Indexación completada" >> $LOG_FILE
EOF

# Hacer el script ejecutable
chmod +x scripts/daily-index.sh

# Configurar cron job (comentar si no se quiere instalar automáticamente)
echo "📅 Para instalar el cron job, ejecuta:"
echo "crontab -e"
echo ""
echo "Y añade esta línea:"
echo "0 9 * * * cd $(pwd) && ./scripts/daily-index.sh"
echo ""
echo "Esto ejecutará la indexación todos los días a las 9:00 AM"

# Crear script de limpieza de logs
cat > scripts/cleanup-logs.sh << 'EOF'
#!/bin/bash

# Limpiar logs más antiguos de 30 días
find logs/ -name "indexing-*.log" -mtime +30 -delete
echo "🧹 Logs antiguos eliminados"
EOF

chmod +x scripts/cleanup-logs.sh

echo "✅ Configuración completada!"
echo ""
echo "📋 Archivos creados:"
echo "   - scripts/daily-index.sh (indexación diaria)"
echo "   - scripts/cleanup-logs.sh (limpieza de logs)"
echo ""
echo "🔧 Para activar:"
echo "   1. Configurar cron job con: crontab -e"
echo "   2. Añadir: 0 9 * * * cd $(pwd) && ./scripts/daily-index.sh"
echo "   3. Opcional: 0 0 1 * * cd $(pwd) && ./scripts/cleanup-logs.sh"
