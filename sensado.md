<!-- MathJax v3 (pégalo al inicio del .md) -->
<script>
  window.MathJax = {
    tex: {inlineMath: [['\\(','\\)']], displayMath: [['$$','$$']]}
  };
</script>
<script async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>

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

## La Comunicación de la Ciencia
La comunicación de la ciencia es tan clave como la obtención de resultados. De poco sirven los resultados si los pares y, peor, la comunidad no logra captar su importancia. Durante este curso haremos ejercicios de cómo expresarnos en tres géneros de la comunicación científica: 
- Propuestas y reportes de investigación
- Presentaciones de las ideas o proyectos científicos
- Poster o carteles para presentar resultados científicos.

Una referencia que recomiendo ampliamente para entender que las ideas no bastan es el escrito de Deconinck, K. (2015). _Trust me, I'm a doctor: a PhD survival guide_. Journal of Economic Education, 46(4), 360-375. [Deconinck, K. (2015)](https://lirias.kuleuven.be/retrieve/316851). Una maravilla para entender que las ideas no bastan.

## Materiales y prácticas
Algunos materiales y guías para el curso las pueden encontrar en las siguientes secciones. Además códigos útiles para realizar prácticas pueden encontrarse en el repositorio: ["Sensado y Modelado de Sistemas Físicos (GITHUB)"](https://github.com/sierraporta/Sensado-y-Modelado-de-Sistemas-Fisicos)

| No | Descripción |
|------|----------------------|
| 1 | **Caída libre – gravedad** Una esfera metálica se libera frente a un fondo blanco y se graba en slow-motion (≥ 60 fps). Con una regla adherida al fondo conviertes píxeles en metros y, fotograma a fotograma, ajustas la trayectoria $$y(t)=y_0+v_0 t+\frac{1}{2} g t^2$$, obteniendo tu valor experimental de $$g$$ con precisión de centésimas. El ejercicio demuestra cómo un sencillo algoritmo de tracking traduce imágenes en datos físicos y abre la puerta al análisis de incertidumbre. **Materiales**: cámara digital o teléfono, trípode, cartulina blanca, regla, esfera pequeña, PC con Python + OpenCV. **Prepárate leyendo**: cinemática unidimensional, mínimos cuadrados y propagación de errores. **Materiales varios:** ["Detecting Points (GITHUB)"](https://github.com/sierraporta/Sensado-y-Modelado-de-Sistemas-Fisicos/blob/main/Detecting_Points.ipynb) (Este código es útil para detectar puntos y formas en figuras, por ejemplo, una bola). Este otro código ["Decomposing videos (GITHUB)"](https://github.com/sierraporta/Sensado-y-Modelado-de-Sistemas-Fisicos/blob/main/Video_Analysis.ipynb) es útil para analizar videso y descoponer en fotogramas. Por ultimo, aqui hay una funciones útiles para ajuste de curvas ["UTILS001 (GITHUB)"](https://github.com/sierraporta/Sensado-y-Modelado-de-Sistemas-Fisicos/blob/main/Utils001_CurveFit.ipynb) | 
| 2 | **Caída libre – conservación de la energía (pelota rebotando)** Filma una pelota elástica que rebota sobre una superficie rígida; cada salto revela cuánta energía se disipa. De las alturas máximas sucesivas $$h_0$$, $$h_1$$, ... obtendrás el coeficiente de restitución $$e=\sqrt{\frac{h_{n+1}}{h_n}}$$ y la fracción de energía perdida $$1-e^2$$. Observarás cómo mecánica clásica y termodinámica “chocan” –literalmente– en cada impacto. Descubrirás que cada rebote es un “experimento de termodinámica” comprimido en milisegundos. **Materiales**: pelota de goma oscura, superficie lisa, la misma cámara y regla del experimento 1. **Para estudiar antes**: principio de conservación de la energía, colisiones inelásticas y coeficiente de restitución. **Materiales**: pelota de goma oscura, superficie lisa, cámara y regla del experimento 1. |
| 3 | **Oscilación de un péndulo – período y gravedad** Suspende una masa con hilo fino, grábala oscilando a pequeña amplitud y mide el período medio $$g=\frac{4\pi^2 L}{T^2}$$ obtenerás un segundo valor de $$g$$; ampliando el ángulo inicial comprobarás la corrección para grandes amplitudes y el efecto del rozamiento. Variando la amplitud, comprobarás cómo el período se alarga cuando el ángulo ya no es “pequeño”, y podrás estimar la influencia del rozamiento. **Materiales**: hilo delgado, masa esférica, soporte de laboratorio, regla larga o calibrador angular, cámara. **Antes del laboratorio**: revisa la deducción del péndulo simple, la aproximación para ángulos pequeños y filtros como Savitzky–Golay para suavizar datos. |
| 4 | **Falling-Sphere Viscometer**  Una micro-esfera cae dentro de un cilindro lleno de glicerina o aceite; tras una breve aceleración alcanza la velocidad terminal $$v(t)$$. Usando la ley de Stokes $$\mu=\frac{2r^2g(\rho_s-\rho_f)}{9v(t)}$$ calcularás la viscosidad dinámica del fluido y el número de Reynolds para verificar que el flujo es laminar ($$R_e<0.5$$). El experimento conecta dinámica de fluidos con técnicas de regresión lineal sobre el tramo donde $$y(t)$$ es estrictamente lineal. **Materiales**: tubo transparente alto, glicerina (u otro fluido), esferas calibradas, termómetro, balanza, cámara, regla. **Temas a leer**: densidad y empuje, ley de Stokes, coeficiente de arrastre y régimen laminar. |
| 5 | **Caoticidad – péndulo doble** El péndulo doble convierte pequeñas diferencias iniciales en trayectorias radicalmente distintas. Filmarás $$\theta_1(t)$$ y $$\theta_2(t)$$ con una cámara de alta velocidad y reconstruirás el espacio de fases para estimar exponentes de Lyapunov, diferenciando movimiento periódico de caos verdadero. Descubrirás visualmente la sensibilidad extrema a las condiciones iniciales que caracteriza a los sistemas no lineales. **Materiales**: kit de péndulo doble, fondo contrastado, cámara ≥ 120 fps, PC con software de extracción de contornos. **Lecturas previas**: sistemas dinámicos no lineales, atractores extraños, cálculo numérico de Lyapunov.Construye un péndulo doble y filma su danza impredecible. Al reconstruir los ángulos ($$\theta_1(t)$$, $$\theta_2(t)$$) explorarás espacios de fase, sensibilidades al estado inicial y exponentes de Lyapunov, adentrándote en el fascinante territorio donde pequeñas causas producen efectos gigantescos. |
| 6 | **Sistema masa-resorte**  Sobre un riel de baja fricción o un air-track unirás una masa a un resorte y registrarás su desplazamiento $$x(t)$$ con un sensor óptico o la cámara. Ajustando el modelo $$m\ddot x+b\dot x+kx=0$$ obtenerás la constante elástica $$k$$ y el coeficiente de amortiguamiento $$b$$, ilustrando cómo los parámetros físicos se infieren mediante optimización y ajuste no lineal. **Materiales**: riel, carro, resorte calibrado, fotopuerta (o cámara), cronómetro digital. **Prepárate revisando**: transformada de Laplace, osciladores sub-amortiguados y técnicas de estimación de parámetros (*curve_fit*, MLE).|
| 7 | **Conducción de calor en una barra metálica** Inserta termocuplas a lo largo de una barra de aluminio y aplica calor en un extremo. El dataset $$T(x)$$ te permitirá ajustar la solución de la ecuación de calor 1-D y estimar la difusividad térmica $$\alpha$$. Además practicarás diferencia finita y modelos basados en datos para PDE. **Materiales**: barra metálica (Al), 4–6 termocuplas, placa calefactora, Arduino o DAQ, Python + *pandas*. **Para estudiar**: ecuación de difusión, métodos numéricos para PDE, linealización y ajuste de parámetros. |
| 8 | **Serie de Fourier de formas de onda periódicas** Con el generador de funciones obtendrás señales cuadrada, triangular y diente de sierra; el osciloscopio digital las muestreará y la FFT revelará su espectro armónico. Comprobarás la caída de amplitud $$1/n$$ o $$1/n^2$$ y observarás el fenómeno de Gibbs al reconstruir la señal con un número finito de armónicos. **Materiales**: generador de funciones, osciloscopio con exportación USB, cables BNC, Python (*numpy.fft*). **Tópicos a repasar**: series de Fourier, ventanas de apodización, resolución espectral y aliasing. |
| 9 | **Respuesta de un circuito RLC – tiempo ↔ frecuencia** Excita un circuito RLC con un barrido de frecuencia y registra entrada y salida simultáneamente. El pico de resonancia y el ancho a $$-3$$dB se convierten en tu puerta de entrada al dominio de Bode y a la noción de calidad $$Q$$; comprobarás que la FFT de la respuesta temporal coincide con la función de transferencia teórica. Construirás un circuito serie RLC y lo excitarás con un barrido de frecuencia; midiendo entrada y salida con el osciloscopio obtendrás la función de transferencia $$H(f)$$ y el factor de calidad $$Q=f_0/\Delta f$$. Confirmarás que la FFT de la respuesta temporal reproduce la curva de Bode prevista teóricamente. **Materiales**: resistencia de precisión, bobina, condensador, generador con modo sweep, osciloscopio de dos canales, protoboard. **Antes de venir**: revisa diagramas de Bode, resonancia eléctrica y relación entre respuesta impulsiva y espectro. |
| 10 | **Modulación AM y “anatomía” de un espectro** Modula una portadora de 100 kHz con un tono de 5 kHz, captura la señal y observa en el espectro la portadora y sus dos bandas laterales. Luego demodúlala digitalmente con la envolvente de Hilbert y juega con diferentes índices de modulación para descubrir cómo viaja la música por el aire… y cómo los ingenieros la recuperan intacta. Configura el generador para una portadora de 100 kHz modulada por un tono de 5 kHz y captura la señal con el osciloscopio a 1 MS/s. La FFT mostrará la portadora y las bandas laterales; con la transformada de Hilbert demodularás la envolvente y analizarás cómo el índice de modulación $$m$$ redistribuye la potencia entre picos espectrales. Es la puerta de entrada al procesamiento de señales de RF y telecomunicaciones digitales. **Materiales**: generador con modo AM, osciloscopio rápido, cables coaxiales, Python (*scipy.signal.hilbert*). **Para prepararte**: conceptos de modulación en amplitud, filtros paso-bajo y demodulación envolvente.|

## Retos “Fuera de la Caja” – Introducción

En el **último corte del curso** pondremos a prueba tu creatividad, tu intuición física y la capacidad de traducir fenómenos cotidianos en *datasets* significativos. Cada equipo elegirá **un único reto** de la lista y lo desarrollará a lo largo de cuatro semanas, documentando el proceso con las mismas herramientas de sensado y modelado que hemos practicado en clase.

### Objetivos generales

1. **Diseñar un montaje experimental original** con materiales de bajo costo y, cuando sea posible, elementos reciclados o de uso doméstico.  
2. **Instrumentar el fenómeno**: elegir sensores, cámaras o técnicas de adquisición para convertir observaciones cualitativas en series de datos cuantitativos.  
3. **Modelar y validar**: construir un modelo teórico (analítico, numérico o basado en *machine learning*) que explique al menos una relación funcional \(f(\mathbf{x})\) entre variables relevantes.  
4. **Comunicar** resultados de forma atractiva: informe en Jupyter/Quarto, video–demo de ≤ 3 min y repositorio en GitHub con código reproducible.

### Criterios de evaluación

| Peso | Criterio | Descripción |
|------|----------|-------------|
| 25 % | Diseño experimental | Claridad del planteamiento, ingenio, control de variables externas. |
| 25 % | Adquisición y limpieza de datos | Calidad del *dataset*, tratamiento de ruido, manejo de incertidumbre. |
| 25 % | Modelado y análisis | Pertinencia del modelo, rigor matemático, validación cuantitativa (p-ej. \(R^{2}\), MAE, o comparación con teoría). |
| 15 % | Comunicación | Estructura del informe, visualizaciones, reproducibilidad del código. |
| 10 % | Factor *wow* | Originalidad, creatividad y profundidad de la reflexión científica. |

> **Tip:** antes de comprometerse con un reto, cada equipo debe presentar un “**one-pager**” con hipótesis, variables a medir, sensores/cámaras planeadas y una estimación del rango de valores esperados (―la pregunta clásica: *¿de cuántas órdenes de magnitud estamos hablando?*).

### Recursos a tu alcance

* **Laboratorio**: cámaras de alta velocidad (240 fps), cronómetros digitales, sensores Hall, Arduino + shields de adquisición y el osciloscopio digital con exportación CSV.  
* **Software**: Python 3.11 con `numpy`, `pandas`, `matplotlib`, `scipy`, `scikit-image`, `scikit-learn` y `sympy`; licencias educativas de Tracker Video Analysis y Algodoo.  
* **Biblioteca digital**: acceso a *Nature Physics Insight*, *American Journal of Physics* y la colección completa de demostraciones del Prof. Tadashi Tokieda.

Al aceptar uno de los retos, te comprometes a **navegar la frontera difusa entre lo lúdico y lo científico**, a preguntar *«¿qué pasaría si…?»* y a respaldar cada conjetura con evidencia cuantitativa. Prepárate para iterar, fallar rápido y aprender aún más rápido. ¡Nos vemos en el laboratorio!

---

A continuación encontrarás la lista de retos disponibles.  
*Recuerda: solo podrás seleccionar uno, así que elige sabiamente.*

### Retos para seleccionar
Los equipos deberán seleccionar uno de estos retos para resolverlos durante el semestre, siguiendo el calendario arriba expuesto.

| No | Descripción |
|------|----------------------|
| Reto 1 | **Dinámica de chapoteo** La dinámica de chapoteo ([*Slosh dynamics*](https://en.wikipedia.org/wiki/Slosh_dynamics)) se refiere al movimiento de líquidos dentro de un recipiente sometido a fuerzas externas. Este fenómeno es relevante en ingeniería, física y diversas industrias en las que es necesario comprender la estabilidad y el rendimiento de los sistemas que contienen líquidos. La dinámica del chapoteo depende de factores como la forma del recipiente, sus dimensiones, el nivel de llenado, las propiedades del líquido (densidad, viscosidad, tensión superficial), las fuerzas externas (aceleración, desaceleración, vibración) y la presencia de estructuras/mecanismos internos diseñadas para mitigarlo. El emprendimiento científico [*The Spill not*](https://thespillnot.com/) comercializa un dispositivo que evita el los líquidos contenidos en tazas o vasos se derramen. Utilizando su celular, parametrice el fenómeno del derrame de líquidos utilizando este dispositivo. |
| Reto 2 | **El problema inverso y las tazas**  Si golpea la parte superior de una taza de café con una cuchara, notará que el sonido depende en gran medida de dónde se golpee. Conociendo la geometría de la taza, se puede predecir el espectro de frecuencia del sonido emitido al tocar en diferentes puntos. Considere ahora el problema inverso y encuentre una técnica experimental para reconstruir la geometría de un recipiente a partir del sonido emitido. ¿Cuál es el conocimiento mínimo sobre la geometría de la copa que se necesita para resolver el problema?  Una interesante discusión de este problema inverso lo pueden ver en el canal youtube del prof [Tadashi Tokieda](https://en.wikipedia.org/wiki/Tadashi_Tokieda): [montaje de video](https://youtu.be/MfzNJE4CK_s) |
| Reto 3 | **Perplejidades de clips y ligas** Hay un monton de trucos bonitos que se hacen con una [cinta de papel, clips y ligas](https://youtu.be/wGkvyN6s9cY) (bandas de goma) que también pueden ver en el canal youtube del prof [Tadashi Tokieda](https://en.wikipedia.org/wiki/Tadashi_Tokieda). La pregunta que les hacemos es ¿Pueden extenderlo para mas de dos vueltas de la cinta de papel? Describa los casos y plantee posibles generalizaciones ¿cuáles serían las limitaciones de los materiales? |
| Reto 4 | **Variedades de Péndulos** Inspirado en el [video de Bruce Yeany](https://youtu.be/615GTw4TNxI) construya y estudie la dinámica de alguno de los péndulos dobles que allí proponen. Compare dos ellos, los que sean más similares. Construya un modelo teórico, simúlelo y compárelo con medidas experimentales. |
| Reto 5 | **Cilindros danzantes**  Otra vez el Prof [Tadashi Tokieda](https://en.wikipedia.org/wiki/Tadashi_Tokieda) nos presenta otro caso curioso de oscilaciones con [cilindros danzantes](https://youtu.be/JuuYFt8bahE) y también [extra de cilindros](https://youtu.be/5dJsOF7_GfY). Parametrice y intente generalizar ese fenómeno. |
| Reto 6 | **Estabilidad e inestabilidad conica** Y seguimos con los ejemplos del Prof [Tadashi Tokieda](https://en.wikipedia.org/wiki/Tadashi_Tokieda), ahora nos presenta [un plano inclinado y dos estrucuras cónicas](https://youtu.be/Ku8BOBwD4hc), unas que ruedan cuesta abajo de forma estable y otras que nó. Analice ambos casos. |
| Reto 7 | **Botellas oscilantes, medio vacías o medio llenas** Si empujas horizontalmente una botella medio llena de agua, rodará hacia delante con una velocidad oscilante. ¿De qué y cómo depende la magnitud de las oscilaciones de la velocidad? ¿de la cantidad o viscosidad de líquido? |
| Reto 8 | **Orden en la pea** A veces, cuando colocamos un vaso boca abajo sobre una mesa plana mojada, empieza a moverse. Investiga su velocidad en función de los parámetros pertinentes e intenta maximizarla. Algo de [información al respecto](https://www.quora.com/Why-does-a-simple-drinking-glass-which-is-just-washed-and-kept-upside-down-start-to-move) |
| Reto 9 | **Hidro Cañon**  ¿A qué altura puede saltar una pelota de ping-pong utilizando el [montaje del vídeo](https://youtu.be/mPOcFSHyd9o?t=478 )? ¿Cuál es la fracción máxima de la energía cinética total que puede transferirse a la pelota? |
| Reto 10 | **Pelotas danzantes**  Cuando una pelota sobre una superficie dura y plana,  golpeada por un chorro de agua que cae perpendicular a la superficie, [puede empezar a oscilar](https://youtu.be/yq_qSWZDHHk). Investiga cómo dependen las oscilaciones de los parámetros pertinentes. |

## Algunas referencias
- Kaps, A., Splith, T. & Stallmach, F. Implementation of smartphone-based experimental exercises for physics courses at universities. Phys. Educ. 56, 035004 (2021). [Kaps, A., Splith, T. & Stallmach, F. (2021)](https://iopscience.iop.org/article/10.1088/1361-6552/abdee2/pdf)
- Monteiro, M. & Martí, A. C. Resource Letter MDS-1: Mobile devices and sensors for physics teaching. Am. J. Phys. 90, 328–343 (2022). [Monteiro, M. & Martí, A. C. (2022)](https://www.academia.edu/download/91485433/2206.12062.pdf)
- Poultney, S. K. Measurement and Its Reliability: An Introductory Laboratory Experiment. Am. J. Phys. 39, 176–182 (1971). [Poultney, S. K. (1971)](https://pubs.aip.org/ajp/article/39/2/176/1048766)
- Schectman, R. M. The Use of Computer Generated Data in Experiment Design—A Student Exercise. Am. J. Phys. 40, 1742–1747 (1972). [Schectman, R. M. (1972)](https://ui.adsabs.harvard.edu/abs/1972AmJPh..40.1742S/abstract)
- Vieyra, R., Vieyra, C., Jeanjacquot, P., Marti, A. & Monteiro, M. Turn your smartphone into lab. Sci Teach 82, 32–40 (2015). ()


