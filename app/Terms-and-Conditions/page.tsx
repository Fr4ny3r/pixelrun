import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Consulta los términos y condiciones de uso de la plataforma PixelRun.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="h-fit text-[#2d2421] md:mr-60 p-4 md:p-8 font-mono">
      <div className="w-full flex flex-col pl-3  border-4 border-[var(--foreground)] p-6 md:p-10 rounded-sm shadow-[8px_8px_0px_0px_rgba(var(--foreground),1)]">
        
        {/* Navegación de regreso */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-block bg-[var(--foreground)] text-[#c5b5ab] px-4 py-2 text-sm font-bold border-2 border-[var(--foreground)]/10 hover:bg-[#433632] transition-colors"
          >
            ← Volver al Inicio
          </Link>
        </div>

        {/* Encabezado */}
        <header className="border-b-4 border-[#2d2421] pb-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wide">
            Términos y Condiciones
          </h1>
          <p className="text-sm font-semibold opacity-80 mt-1">
            Última actualización: 15 de Septiembre de 2026
          </p>
        </header>

        {/* Contenido principal */}
          <article className="space-y-6 scrollTransaction pb-4 overflow-auto md:h-92 text-sm md:text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-bold uppercase border-l-4 border-[#2d2421] pl-3 mb-2">
              1. Aceptación de los Términos
            </h2>
            <p>
              Al acceder o utilizar la plataforma <strong>PixelRun</strong> (pixelrun-ten.vercel.app),
              aceptas cumplir y estar sujeto a los presentes Términos y Condiciones. Si no estás
              de acuerdo con alguna parte de estos términos, no debes utilizar nuestra plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold uppercase border-l-4 border-[#2d2421] pl-3 mb-2">
              2. Registro de Cuenta y Seguridad
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Cada usuario tiene permitido crear y mantener solo <strong>una (1) cuenta única</strong>.</li>
              <li>Queda estrictamente prohibida la creación de múltiples cuentas por la misma persona o dirección IP para acumular puntos de manera abusiva.</li>
              <li>Eres responsable de mantener la confidencialidad de tus credenciales de acceso y de toda la actividad realizada desde tu cuenta.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold uppercase border-l-4 border-[#2d2421] pl-3 mb-2">
              3. Sistema de Puntos y Recompensas
            </h2>
            <p>
              Los puntos acumulados al jugar minijuegos o visualizar anuncios dentro de PixelRun son unidades virtuales sin valor monetario garantizado hasta el momento de solicitar un retiro mediante los métodos habilitados.
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>PixelRun se reserva el derecho de modificar la tasa de conversión de puntos a saldo en cualquier momento.</li>
              <li>Las solicitudes de retiro (cashout) están sujetas a revisión previa para validar la legitimidad de las transacciones y puntos obtenidos.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold uppercase border-l-4 border-[#2d2421] pl-3 mb-2">
              4. Uso Prohibido y Trampas (Fair Play)
            </h2>
            <p>
              En PixelRun promovemos el juego limpio. Las siguientes acciones resultarán en la <strong>suspensión inmediata o baneo permanente</strong> de la cuenta y la anulación total del saldo acumulado:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Uso de bots, emuladores automatizados, auto-clickers o scripts para simular partidas o vistas de anuncios.</li>
              <li>Bloqueadores de anuncios (AdBlockers) o modificaciones del tráfico de red para alterar el balance de puntos.</li>
              <li>Explotación de fallos o vulnerabilidades del sistema sin reportarlas previamente a la administración.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold uppercase border-l-4 border-[#2d2421] pl-3 mb-2">
              5. Visualización de Anuncios y Contenido de Terceros
            </h2>
            <p>
              PixelRun integra servicios publicitarios de terceros para financiar las recompensas. No asumimos responsabilidad por el contenido, productos o servicios promocionados en los anuncios mostrados dentro de la aplicación.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold uppercase border-l-4 border-[#2d2421] pl-3 mb-2">
              6. Modificaciones del Servicio
            </h2>
            <p>
              Nos reservamos el derecho de actualizar, pausar o modificar cualquier aspecto de PixelRun, incluidos las dinámicas de juego, los niveles y los términos del servicio, en cualquier momento y sin previo aviso.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold uppercase border-l-4 border-[#2d2421] pl-3 mb-2">
              7. Contacto
            </h2>
            <p>
              Si tienes preguntas sobre estos Términos y Condiciones, puedes contactarnos a través del panel de soporte dentro de tu perfil de usuario o por nuestras redes oficiales.
            </p>
          </section>
        </article>

        {/* Pie de página dentro de la tarjeta */}
        <footer className="mt-8 pt-4 border-t-2 border-[#2d2421] text-center text-xs opacity-75">
          © {new Date().getFullYear()} PixelRun. Todos los derechos reservados.
        </footer>

      </div>
    </main>
  );
}