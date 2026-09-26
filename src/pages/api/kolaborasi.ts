import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const form = await request.formData();

    const nama = String(form.get("nama") || "");
    const email = String(form.get("email") || "");
    const institusi = String(form.get("institusi") || "");
    const lokasi = String(form.get("lokasi") || "");
    const peserta = String(form.get("peserta") || "");
    const waktu = String(form.get("waktu") || "");
    const pesan = String(form.get("pesan") || "");

    await env.EMAIL.send({
      from: "halo@rakan.my.id",
      to: "rakanisius@gmail.com",
      subject: `Kolaborasi Baru — ${nama}`,
      text: `
Nama: ${nama}
Email: ${email}
Institusi: ${institusi}
Lokasi: ${lokasi}
Jumlah Peserta: ${peserta}
Perkiraan Waktu: ${waktu}

Pesan:
${pesan}
      `.trim(),

      html: `
        <h2>Pengajuan Kolaborasi Baru</h2>

        <p><strong>Nama:</strong> ${nama}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Institusi:</strong> ${institusi}</p>
        <p><strong>Lokasi:</strong> ${lokasi}</p>
        <p><strong>Jumlah Peserta:</strong> ${peserta}</p>
        <p><strong>Perkiraan Waktu:</strong> ${waktu}</p>

        <hr>

        <p>${pesan.replace(/\n/g, "<br>")}</p>
      `
    });

    return new Response(null, {
  status: 303,
  headers: {
    Location: "/kolaborasi/terima-kasih"
  }
});
  } catch (error) {
    console.error(error);

    return new Response("Gagal mengirim formulir.", {
      status: 500
    });
  }
};