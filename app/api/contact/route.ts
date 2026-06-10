import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { nombre, email, telefono, mensaje } = body;

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: 'Campos obligatorios faltantes' },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: 'GFA Abogados <contacto@gfabogados.co>',
      to: process.env.CONTACT_EMAIL!,
      subject: 'Nueva consulta desde la web',
      replyTo: email,
      html: `
        <h2>Nueva consulta</h2>

        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono || 'No informado'}</p>

        <hr>

        <p>${mensaje}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Error enviando correo' },
      { status: 500 }
    );
  }
}