// src/pages/api/send-cv.ts
export const prerender = false; // <-- AÑADE ESTA LÍNEA AQUÍ

import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST = async ({ request }) => {
  try {
    const data = await request.formData();
    
    const nombre = data.get('nombre')?.toString();
    const email = data.get('email')?.toString();
    const telefono = data.get('telefono')?.toString();
    const pais = data.get('pais')?.toString();
    const provincia = data.get('provincia')?.toString() || 'N/A';
    const file = data.get('attachment') as File;

    if (!file || !nombre || !email) {
      return new Response(JSON.stringify({ error: "Faltan datos requeridos" }), { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data: resendData, error } = await resend.emails.send({
      from: 'Web CCD <onboarding@resend.dev>', // Cambiar por tu dominio verificado luego
      to: ['ccdcompetitividad@gmail.com'], // Pon tu correo
      subject: `Nueva Postulación: ${nombre} - ${pais}`,
      html: `
         <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            .container { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden; }
            .header { background-color: #910121; color: #ffffff; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }
            .content { padding: 30px; background-color: #ffffff; }
            .content h2 { color: #910121; font-size: 18px; margin-top: 0; border-bottom: 2px solid #f4f4f4; padding-bottom: 10px; }
            .info-grid { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .info-item { padding: 12px 0; border-bottom: 1px solid #f9f9f9; }
            .label { font-weight: bold; color: #666; width: 30%; font-size: 14px; }
            .value { color: #333; font-size: 15px; }
            .footer { background-color: #f9f9f9; color: #888; padding: 20px; text-align: center; font-size: 12px; }
            .badge { background-color: #910121; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Nueva Postulación</h1>
              <p style="margin-top: 10px; opacity: 0.9;">Centro para la Competitividad y el Desarrollo</p>
            </div>
            
            <div class="content">
              <h2>Datos del Candidato</h2>
              <table class="info-grid">
                <tr class="info-item">
                  <td class="label">Nombre completo</td>
                  <td class="value">${nombre}</td>
                </tr>
                <tr class="info-item">
                  <td class="label">Correo electrónico</td>
                  <td class="value"><a href="mailto:${email}" style="color: #910121; text-decoration: none;">${email}</a></td>
                </tr>
                <tr class="info-item">
                  <td class="label">Teléfono / Celular</td>
                  <td class="value">${telefono}</td>
                </tr>
                <tr class="info-item">
                  <td class="label">Ubicación</td>
                  <td class="value">${pais}${provincia !== 'N/A' ? `, ${provincia}` : ''}</td>
                </tr>
              </table>
              
              <div style="margin-top: 30px; padding: 15px; background-color: #fff5f6; border-radius: 6px; border-left: 4px solid #910121;">
                <p style="margin: 0; font-size: 14px; color: #910121;">
                  <strong>Nota:</strong> El currículum vitae ha sido adjuntado a este correo en formato original.
                </p>
              </div>
            </div>
            
            <div class="footer">
              <p>Este es un mensaje automático enviado desde el portal de Carreras de <strong>CCD</strong>.</p>
              <p>&copy; ${new Date().getFullYear()} Centro para la Competitividad y el Desarrollo</p>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: file.name,
          content: buffer,
        },
      ],
    });

    if (error) {
      console.error('[send-cv] Resend error:', JSON.stringify(error));
      return new Response(JSON.stringify({ error: error.message || error }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    console.error('[send-cv] Caught exception:', error?.message, error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};