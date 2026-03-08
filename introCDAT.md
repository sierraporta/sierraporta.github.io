<!-- MathJax v3 (pégalo al inicio del .md) -->
<script>
  window.MathJax = {
    tex: {inlineMath: [['\\(','\\)']], displayMath: [['$$','$$']]}
  };
</script>
<script async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>

# Curso **Introducción a la Ciencia de Datos**
<img class="float-left float--sm"
     src="/Figures/datascience.png"
     alt="Introduccion a la ciencia de datos"
     width="420" height="280" decoding="async">
          
## Presentación del curso y motivación
El curso “Introducción a la Ciencia de Datos” es la puerta de entrada a uno de los campos más apasionantes, transformadores y estratégicos del siglo XXI. Dirigido a estudiantes que inician su camino en esta disciplina, el curso no requiere conocimientos previos de programación ni matemáticas avanzadas. Por el contrario, está diseñado para despertar la curiosidad, generar entusiasmo y brindar una comprensión clara, accesible y motivadora sobre el impacto real que la ciencia de datos puede tener en el mundo.
Desde la predicción del clima hasta el análisis de redes sociales, pasando por la mejora de la atención médica, la eficiencia en el transporte o la toma de decisiones inteligentes en negocios, la ciencia de datos está presente en casi todos los aspectos de nuestra vida. Este curso busca maravillar a los estudiantes con ejemplos concretos, soluciones inspiradoras y herramientas visuales que les permitan ver, desde el primer día, el poder que tiene esta disciplina para transformar realidades y generar conocimiento a partir de los datos.

## Objetivos del curso
- Comprender los fundamentos conceptuales de la ciencia de datos y su rol en la sociedad contemporánea.
- Explorar, sin barreras técnicas, las etapas clave del ciclo de vida de los datos: recolección, limpieza, visualización, modelado y comunicación.
- Conocer aplicaciones reales en diversas áreas como salud, medio ambiente, educación, negocios, justicia, sostenibilidad, y más.
- Desarrollar la capacidad crítica para identificar problemas donde los datos pueden ser parte de la solución.
- Motivar el aprendizaje autónomo, la creatividad y el deseo de profundizar en herramientas técnicas en cursos posteriores.

## Metodología del curso
La metodología de este curso está basada en el aprendizaje exploratorio, activo y guiado por el asombro. A través de estudios de caso, dinámicas participativas, juegos de datos, visualizaciones interactivas, simulaciones y herramientas de análisis accesibles, los estudiantes vivirán experiencias que les permitan pensar como científicos de datos desde el inicio, incluso sin escribir una sola línea de código.
Se privilegiará el uso de herramientas visuales y plataformas intuitivas (como Power BI, Tableau, Google Sheets, Datawrapper, Python Profiling o Alteryx en su modo visual), con sesiones en las que los estudiantes puedan analizar datos reales, construir reportes, interpretar gráficas y discutir implicaciones sociales, éticas y profesionales del trabajo con datos.

El curso se apoya en exposiciones breves, videos explicativos, conversaciones guiadas y trabajo colaborativo. Se promoverán ejercicios que estimulen la curiosidad, el pensamiento crítico y la conciencia del potencial transformador de los datos en la toma de decisiones informadas.

## Proyecto final y feria de ciencia de datos
Como culminación del proceso formativo, al final del curso los estudiantes desarrollarán un proyecto grupal integrador, en el que deberán diseñar, ejecutar y analizar un experimento original que combine sensado físico, recolección rigurosa de datos y técnicas avanzadas de análisis y modelado. Este proyecto representa una oportunidad para aplicar de forma creativa e independiente los conocimientos adquiridos a lo largo del semestre, enfrentándose a un problema abierto que requiere pensamiento crítico, autonomía y colaboración efectiva. Los proyectos serán presentados públicamente en la Feria de Proyectos de Ciencia de Datos, un espacio institucional de socialización académica donde los estudiantes podrán compartir sus resultados con sus compañeros, docentes e invitados. Algunos proyectos también podrán ser seleccionados para participar en la Feria de Ciencias de la Universidad, ampliando el alcance del trabajo y fomentando la apropiación social del conocimiento generado. Este cierre busca reforzar las competencias de comunicación científica, el trabajo interdisciplinario y el compromiso con la calidad en todas las etapas del ciclo de análisis de datos.

---

## Programación del curso por cortes — Introducción a la Ciencia de Datos - **Periodo 202520/202610**

### **Corte 1 · Mini-dashboard (HTML + CSS) con World Happiness Report**
- **Objetivo.** Construir una página web estática (un solo `index.html` con `<style>` embebido) que muestre la evolución de la felicidad de **Colombia** por año, sus variables asociadas y comparaciones con países mejor y peor posicionados.
- **Datos.**  
     - Página: [World Happiness Report 2025 - https://www.worldhappiness.report/ed/2025/](https://www.worldhappiness.report/ed/2025/)  
     - Excel: [`WHR25_Data_Figure_2.1.xlsx`](https://files.worldhappiness.report/WHR25_Data_Figure_2.1.xlsx?_gl=1*qi68f2*_gcl_au*ODQ2MjI2NDM4LjE3NTQ4NzAzMzc.) (puntajes por país/año)
- **Requisitos mínimos.**  
     - Título y breve explicación (3–5 líneas) del indicador.  
     - Tabla/lista con Colombia por año (últimos 10–12 años disponibles).  
     - Dos comparaciones: **Top** (un país por encima) y **Bottom** (uno por debajo).  
     - Un gráfico simple **sin librerías JS** (p. ej., barras con `<div>` y `width:` en CSS o `<svg>` nativo).  
     - Citas y fecha de acceso.
- **Entregable.** `index.html` (más imágenes si usas).  
- **Evaluación (100 pts).** 30 datos correctos · 30 diseño/legibilidad · 25 narrativa · 15 limpieza del código.

| Materiales Varios | Descripción | ¿Donde? |
| --- | --- | --- |
| Notebook para reproducir Figura 2.1 de WHR2025 | Una pequeña introducción que nos va a durar un par de semanas | [HappinessReport2025.ipynb](https://github.com/sierraporta/Introduction-a-la-Ciencia-de-Datos-Notas-de-Curso/blob/main/Notebooks/HappinessReport2025.ipynb) |
| Conjunto de Datos del WHR2025 | Datos para el notebook anterior | [WHR25_Data_Figure_2.1.xlsx](https://github.com/sierraporta/Introduction-a-la-Ciencia-de-Datos-Notas-de-Curso/blob/main/Datas/WHR25_Data_Figure_2.1.xlsx) |

### **Corte 2 · Mini-unidad: dashboards automatizados con Power BI (4 semanas)**
- **Objetivo.** Diseñar un dashboard interactivo y automatizable en Power BI a partir de datos reales, para explorar indicadores clave, apoyar la toma de decisiones y comunicar hallazgos de forma clara y visual.
- **Datos.**  
     - Página de los datos (Our World in Data): [https://www.worldhappiness.report/ed/2025/](https://ourworldindata.org/grapher/gender-gap-education-levels)
     - Datos Originales (Our World in Data): [gender-gap-education-levels (OWiD)](https://github.com/sierraporta/Introduction-a-la-Ciencia-de-Datos-Notas-de-Curso/tree/main/Datas/gender-gap-education-levels)
     - Notebook para transformar datos: [Notebook, Transformar datos... (powerbi_education_gender_prep.ipynb)](https://github.com/sierraporta/Introduction-a-la-Ciencia-de-Datos-Notas-de-Curso/blob/main/Notebooks/powerbi_education_gender_prep.ipynb)
     - Excel transformado (Para PowerBI): [gender_gap_education_2020_2024_powerbi.csv](https://github.com/sierraporta/Introduction-a-la-Ciencia-de-Datos-Notas-de-Curso/blob/main/Datas/gender-gap-education-levels/gender_gap_education_2020_2024_powerbi.csv)
- **¿Qué haremos?**  
     - Semana 1. Qué es un dashboard, KPI, audiencia y preguntas de análisis. Cargar un CSV/Excel en Power BI Desktop. Power BI Desktop sigue disponible gratis para crear reportes, y Looker Studio sigue siendo una alternativa web sin costo.
     - Semana 2. Limpieza básica y modelado: tipos de datos, fechas, categorías, relaciones simples y columnas calculadas básicas.
     - Semana 3. Construcción del dashboard: tarjetas, barras, líneas, segmentadores, filtros y diseño visual.
     - Semana 4. Automatización básica: conectar a una fuente actualizable, refrescar datos y entregar un dashboard con una historia clara.
- **Entregable.** `index.html` (más imágenes si usas).

| Materiales Varios | Descripción | ¿Donde? |
| --- | --- | --- |
| Notebook para transformar datos | Un notebook inicial que nos ayudará a dejar un dataset listo para PowerBI | [Notebook, Transformar datos... (powerbi_education_gender_prep.ipynb)](https://github.com/sierraporta/Introduction-a-la-Ciencia-de-Datos-Notas-de-Curso/blob/main/Notebooks/powerbi_education_gender_prep.ipynb) |
| Conjunto de Datos: Excel transformado (Para PowerBI) | Datos exportados del notebook anterior | [gender_gap_education_2020_2024_powerbi.csv](https://github.com/sierraporta/Introduction-a-la-Ciencia-de-Datos-Notas-de-Curso/blob/main/Datas/gender-gap-education-levels/gender_gap_education_2020_2024_powerbi.csv) |

### **Corte 3 · Reel tipo Instagram: “Si la UTB tuviera 100 estudiantes…”**
- **Objetivo.** Crear un video corto (30–60 s) que comunique datos de una **encuesta propia** como si la población total fueran **100 estudiantes**. Aquí hay un ejemplo de lo que queremos: [Video de Instagram - https://www.instagram.com/reel/DN4A3Z9gOkp/?igsh=djhjNWdlMm1pd3kx](https://www.instagram.com/reel/DN4A3Z9gOkp/?igsh=djhjNWdlMm1pd3kx)
- **Ejemplos de variables.** Programa, semestre, jornada, becas, acceso a internet/dispositivo, tiempo de estudio, empleo, transporte, bienestar (sueño, actividad física, apoyo).
- **Requisitos mínimos.**  
     - **Guion + storyboard** (5–8 cuadros).  
     - Normalización a “100 personas” (proporciones claras).  
     - Gráficos/íconos consistentes (barras, pictogramas, mosaico 10×10).  
     - Texto conciso (≤ 12–15 palabras/pantalla), música libre de derechos o propia, **créditos** (autores, fecha, aviso ético).
- **Entregables.** `guion.pdf`, `storyboard` (PDF/PNG), `datos.csv`, `reel.mp4` (1080×1920 vertical).  
- **Evaluación (100 pts).** 35 rigor de datos · 35 claridad visual/ritmo · 20 creatividad/insight · 10 ética y créditos.

### **Para rematar · Mini-proyecto final (elige 1)**
- **Objetivo.** Integrar el ciclo **pregunta → datos → análisis → visualización → comunicación** en un entregable breve y reproducible.
- **Opciones.**  
     1) **EDA reproducible (notebook).** Limpieza básica, 2–3 gráficos con `matplotlib`, hallazgos en 8–12 líneas.  
     2) **Scraping ligero + limpieza.** Extraer 1 tabla pública, guardar CSV, limpiar 3–4 campos y visualizar 1 gráfico.  
     3) **Mini-clasificación baseline.** CSV tabular, train/test, modelo simple (p. ej., regresión logística), **accuracy/F1** y 1 gráfico de coeficientes/importancia.
- **Entregables.** `README.md` (pregunta, datos, pasos), datos (`.csv`) o script, `notebook.ipynb`, 1 visual final (`.png`/`.svg`).  
- **Evaluación (100 pts).** 30 reproducibilidad · 30 calidad del análisis · 25 comunicación del insight · 15 orden del repo.

### Criterios transversales
- **Versionado y orden:** carpetas claras, nombres consistentes, `README.md`.  
- **Ética y citas:** anonimización cuando aplique, enlaces a fuentes y fecha de acceso.  
- **Presentación breve:** cada proyecto abre con una **pregunta** y cierra con una **frase-insight**.

---

## Materiales y prácticas
Algunos materiales y guías para el curso las pueden encontrar en las siguientes secciones.



