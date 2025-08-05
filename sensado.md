# Curso introductorio de **Sensado y Modelado de Sistemas Físicos**
<img class="float-left float--sm"
     src="/Figures/smsf.png"
     alt="Sensado y Modelado de Sistemas Físicos"
     width="420" height="280" decoding="async">
          
## Presentación del curso y motivación
En un mundo donde los datos gobiernan las decisiones en ciencia, industria y tecnología, la capacidad de recolectar, analizar e interpretar información del entorno físico se ha vuelto esencial. El curso "Sensado y Modelado de Sistemas Físicos" nace como una propuesta innovadora dentro del programa de Ciencia de Datos, con el objetivo de conectar el mundo físico con la analítica de datos a través de experiencias prácticas y computacionales que vinculan sensores, fenómenos reales y modelado numérico. Este curso no es un curso tradicional de física, ni tampoco uno centrado exclusivamente en electrónica o experimentación. Se sitúa en un terreno interdisciplinario que permite al estudiante vivir el ciclo completo del dato: desde su captura en entornos físicos mediante cámaras, sensores o dispositivos digitales, hasta su análisis y modelado computacional usando herramientas propias de la ciencia de datos. El laboratorio se convierte así en un espacio de exploración cuantitativa donde fenómenos cotidianos –como el rebote de una pelota, el sonido de una cuerda vibrante o la disipación de calor– son oportunidades para aplicar estadística, procesamiento de señales, visualización y modelos predictivos.

## Novedad e importancia
La propuesta de este curso es única en su tipo: en lugar de abordar el análisis de datos desde conjuntos de datos estáticos y previamente depurados, los estudiantes se enfrentan al reto de trabajar con datos reales, con todas las imperfecciones propias de un sistema físico: ruido, errores de medición, límites del instrumento, resolución temporal, etc. Esto fomenta habilidades críticas para un científico de datos moderno, como la toma de decisiones en contextos inciertos, el diseño de estrategias de limpieza y preprocesamiento, y la validación de modelos con significancia física. Además, el uso de experimentos accesibles y visuales facilita la comprensión intuitiva de conceptos como periodicidad, amortiguamiento, espectros de frecuencia o dinámica no lineal, preparando a los estudiantes para abordar problemas complejos tanto en la ciencia como en la industria.

## Objetivos del curso
- Introducir a los estudiantes en el ciclo completo de adquisición, análisis y modelado de datos provenientes de sistemas físicos reales.
- Fomentar la comprensión crítica de las relaciones entre fenómenos físicos y su representación matemática y computacional.
- Desarrollar habilidades prácticas en el uso de sensores, video, audio y técnicas de recolección de datos.
- Aplicar herramientas estadísticas, visuales y computacionales para explorar, modelar e interpretar datos experimentales.
- Fortalecer la capacidad de comunicar hallazgos de forma visual y escrita, y de trabajar de forma colaborativa en entornos experimentales y computacionales.

## Metodología del curso
El curso “Sensado y Modelado de Sistemas Físicos” está diseñado como una experiencia integral que combina la exploración experimental con el análisis computacional. Su metodología se basa en el aprendizaje activo, por medio del diseño, ejecución y análisis de experimentos físicos accesibles, relevantes y vinculados con fenómenos del mundo real. Se busca que los estudiantes comprendan cómo los datos se originan, cómo se recolectan en condiciones no ideales y cómo se transforman en conocimiento mediante herramientas propias de la ciencia de datos.

- Cada semana está estructurada en dos sesiones complementarias de dos horas cada una. La primera sesión se desarrolla en el laboratorio físico, donde los estudiantes realizan un experimento práctico utilizando sensores, cámaras, micrófonos u otros dispositivos de medición. Durante esta sesión se discuten las condiciones del experimento, se identifican las fuentes de error, se registran los datos y se promueve la reflexión crítica sobre el fenómeno observado y su representación cuantitativa.
- La segunda sesión tiene lugar en el laboratorio de cómputo, donde los estudiantes procesan los datos recolectados utilizando herramientas computacionales como Python y sus librerías científicas. En esta etapa se abordan técnicas de visualización, preprocesamiento, limpieza de datos, análisis estadístico, ajuste de modelos físicos, y exploración de métodos robustos frente al ruido y la incertidumbre experimental. Se introducen progresivamente conceptos de modelado predictivo, análisis espectral, regresión y validación de hipótesis, siempre en el contexto de datos generados directamente por los propios estudiantes.

Esta metodología permite un aprendizaje vivencial, interdisciplinario y altamente contextualizado, donde la ciencia de datos se aplica directamente sobre fenómenos observables, fortaleciendo así tanto las competencias analíticas como las habilidades prácticas y de trabajo colaborativo.

### Proyecto final y feria de ciencia de datos
Como culminación del proceso formativo, al final del curso los estudiantes desarrollarán un proyecto grupal integrador, en el que deberán diseñar, ejecutar y analizar un experimento original que combine sensado físico, recolección rigurosa de datos y técnicas avanzadas de análisis y modelado. Este proyecto representa una oportunidad para aplicar de forma creativa e independiente los conocimientos adquiridos a lo largo del semestre, enfrentándose a un problema abierto que requiere pensamiento crítico, autonomía y colaboración efectiva. Los proyectos serán presentados públicamente en la Feria de Proyectos de Ciencia de Datos, un espacio institucional de socialización académica donde los estudiantes podrán compartir sus resultados con sus compañeros, docentes e invitados. Algunos proyectos también podrán ser seleccionados para participar en la Feria de Ciencias de la Universidad, ampliando el alcance del trabajo y fomentando la apropiación social del conocimiento generado. Este cierre busca reforzar las competencias de comunicación científica, el trabajo interdisciplinario y el compromiso con la calidad en todas las etapas del ciclo de análisis de datos.

## Materiales y prácticas
Algunos materiales y guías para el curso las pueden encontrar en las siguientes secciones.

### 1. Caída libre – gravedad
Deja caer una pequeña esfera frente a una cámara de alta velocidad, extrae la trayectoria fotograma a fotograma y ajusta la curva \(y(t) = y_0 + v_0t + \tfrac12gt^2\). En menos de un minuto obtienes tu propio valor de \(g\), compruebas la universalidad de la aceleración terrestre y descubres cómo un sencillo algoritmo de *tracking* convierte píxeles y tiempo en física de precisión.

### 2. Caída libre – conservación de la energía (pelota rebotando)
Graba una pelota que rebota sucesivamente sobre una superficie rígida: cada salto revela cuánta energía se disipa y el coeficiente de restitución del material. Con un análisis rápido de alturas máximas o tiempos de vuelo observarás cómo la mecánica clásica y la termodinámica chocan — literalmente — en cada impacto.

### 3. Oscilación de un péndulo – período y gravedad
Suspende una masa de hilo delgado, registra su oscilación y extrae el período a partir de los cruces por el punto de equilibrio. Relaciónalo con la fórmula \(T = 2\pi\sqrt{L/g}\) para re-estimar \(g\) y, si te atreves, investiga las correcciones para grandes amplitudes o el efecto del rozamiento en el aire.

### 4. Falling-Sphere Viscometer
Deja caer una micro-esfera en un cilindro lleno de glicerina o aceite y mide la velocidad terminal. Con una simple ecuación de Stokes (\(F_D = 6\pi\mu r v\)) podrás calcular la viscosidad del fluido y el número de Reynolds, descubriendo en el proceso por qué la miel es tan pegajosa y cómo la física gobierna cada gota.

### 5. Caoticidad – péndulo doble
Construye un péndulo doble y filma su danza impredecible. Al reconstruir los ángulos \(\theta_1(t), \theta_2(t)\) explorarás espacios de fase, sensibilidades al estado inicial y exponentes de Lyapunov, adentrándote en el fascinante territorio donde pequeñas causas producen efectos gigantescos.

### 6. Sistema masa-resorte
Sobre un riel de aire o una guía de baja fricción, une una masa a un resorte y registra su movimiento amortiguado. Con un ajuste no lineal extraerás constante elástica \(k\) y coeficiente de amortiguamiento \(b\); descubrirás cómo los mismos algoritmos que usan los ingenieros para suspensiones de autos caben en un *notebook* de Python.

### 7. Conducción de calor en una barra metálica
Inserta varias termocuplas a lo largo de una barra de aluminio y calienta un extremo. Mientras la temperatura se propaga, tu dataset \(T(x,t)\) se convierte en un laboratorio viviente para la ecuación de calor 1-D: estimarás la difusividad térmica \(\alpha\) y practicarás técnicas de ajuste de PDEs y modelos basados en datos.

### 8. Serie de Fourier de formas de onda periódicas
Genera señales cuadradas, triangulares y de diente de sierra, captúralas con el osciloscopio y descompónelas con la FFT. Verás emerger los armónicos con la ley \(1/n\) o \(1/n^2\), experimentarás el fenómeno de Gibbs y entenderás por qué cualquier sonido complejo no es más que la suma de muchas sencillas senoidales.

### 9. Respuesta de un circuito RLC – tiempo ↔ frecuencia
Excita un circuito RLC con un barrido de frecuencia y registra entrada y salida simultáneamente. El pico de resonancia y el ancho a \(-3\text{ dB}\) se convierten en tu puerta de entrada al dominio de Bode y a la noción de calidad \(Q\); comprobarás que la FFT de la respuesta temporal coincide con la función de transferencia teórica.

### 10. Modulación AM y “anatomía” de un espectro
Modula una portadora de 100 kHz con un tono de 5 kHz, captura la señal y observa en el espectro la portadora y sus dos bandas laterales. Luego demodúlala digitalmente con la envolvente de Hilbert y juega con diferentes índices de modulación para descubrir cómo viaja la música por el aire… y cómo los ingenieros la recuperan intacta.



