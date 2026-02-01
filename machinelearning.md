<!-- MathJax v3 (pégalo al inicio del .md) -->
<script>
  window.MathJax = {
    tex: {inlineMath: [['\\(','\\)']], displayMath: [['$$','$$']]}
  };
</script>
<script async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>

# Curso de **Machine Learning** (Doctorado)
<img class="float-left float--sm"
     src="/Figures/ml_doctorado.png"
     alt="Machine Learning (Doctorado)"
     width="420" height="280" decoding="async">

## Presentación del curso y motivación
Machine Learning (ML) se ha convertido en una herramienta central para la investigación moderna: permite construir modelos que aprenden patrones a partir de datos y generalizan a escenarios nuevos, con aplicaciones que van desde ciencias naturales y salud hasta industria, finanzas y políticas públicas. Este curso está diseñado para doctorado con un enfoque riguroso y práctico: además de entrenar modelos, discutiremos criterios de evaluación, fuentes de sesgo, diseño experimental con datos, validación robusta y reproducibilidad computacional.

Más que una colección de algoritmos, el curso enfatiza el **ciclo completo**: formulación del problema, diseño del dataset (y sus limitaciones), preprocesamiento y *pipelines*, entrenamiento, evaluación honesta, ajuste, interpretación y finalmente despliegue y comunicación científica de resultados.

## Novedad e importancia
El énfasis del curso no es “correr modelos”, sino **entender**:  
- qué hipótesis estadística / geométrica está detrás de cada algoritmo,  
- cómo se comportan los métodos bajo ruido, desbalance, *shift* de distribución y *leakage*,  
- y cómo reportar resultados con prácticas reproducibles (notebooks, control de versiones, reportes claros).

El objetivo es que el estudiante pueda **defender** decisiones metodológicas con rigor, y no solo presentar métricas “altas”.

## Objetivos del curso
- Construir una base sólida sobre aprendizaje supervisado, no supervisado y por refuerzo (visión general).
- Dominar el flujo de trabajo en ML con énfasis en **validación**, **métricas** y control de sobreajuste.
- Implementar modelos fundamentales (regresión lineal/logística, árboles, ensambles, SVM, ANN) y comprender sus supuestos.
- Aplicar métodos no supervisados (K-Means, PCA, DBSCAN) y evaluar calidad de clusters.
- Realizar optimización de hiperparámetros de manera reproducible (Grid/Random y, opcionalmente, bayesiana).
- Preparar un entregable final con estándares de investigación: reporte, repositorio reproducible y (si aplica) demo de despliegue.

## Metodología del curso
El curso se organiza en **16 semanas**, con un máximo de **1 notebook por semana** (ocasionalmente 2 si es imprescindible separar teoría + laboratorio extenso). Cada notebook es un módulo autocontenido con:

- objetivo y preguntas guía,
- dataset (simulado y/o real) + EDA mínima,
- baseline + pipeline (split + preprocesamiento),
- modelo(s) y diagnóstico,
- evaluación (métricas + gráficos),
- ejercicios y mini–entregable.

Se espera trabajo continuo y acumulativo: los notebooks alimentan el **proyecto final**, que integra todas las etapas del ciclo de vida del modelo.

## Evaluación (sugerencia)
| Componente | Peso | Descripción |
|---|---:|---|
| Quizzes / controles cortos | 15% | Conceptos y lectura crítica (métricas, validación, supuestos) |
| Notebooks semanales (mini–labs) | 35% | Ejecución + interpretación + ejercicios (reproducibles) |
| Tarea de evaluación robusta | 15% | CV, comparación de modelos, y reporte de incertidumbre |
| Proyecto final | 35% | Repositorio, reporte, presentación y discusión |

## La Comunicación de la Ciencia
La comunicación es parte del método. Durante el curso trabajaremos tres formatos:
- **Reporte técnico / paper-style** (motivación, método, resultados, limitaciones).
- **Presentación oral** (10–12 min) enfocada en decisiones y trade-offs.
- **Poster / resumen visual** (figuras, tablas, narrativa breve).

Se valora claridad, honestidad metodológica (evitar leakage), y trazabilidad (que alguien pueda reproducir tu resultado).

## Repositorio del curso
Todo el material (notebooks, datasets, slides, guías y rúbricas) estará organizado en GitHub:

- **Repositorio:** `REPO_URL`  
- Estructura recomendada:
  - `Notebooks/`
  - `Datasets/` (o scripts de descarga)
  - `Slides/`
  - `Assignments/`
  - `Project/` (plantilla, rúbrica, checklist, ejemplos)
  - `Utils/` (funciones comunes, métricas, plots, seeds, helpers)

---

## Cronograma y notebooks (16 semanas)
> Regla: **1 notebook por semana**. Solo se usan 2 cuando el laboratorio es largo (marcado como “Opcional B”).

| Semana | Notebook | Tema central | Entregable |
|---:|---|---|---|
| 1 | `Notebooks/ML_01_workflow.ipynb` | Intro ML + workflow + *leakage* + splits | Mini–lab (split y baseline) |
| 2 | `Notebooks/ML_02_preprocessing.ipynb` | Preprocesamiento tabular + `Pipeline` | Pipeline reproducible |
| 3 | `Notebooks/ML_03_metrics_general.ipynb` | Métricas (reg/clas) + umbral + ROC/PR | Selección justificada de métricas |
| 4 | `Notebooks/ML_04_linear_ridge_lasso.ipynb` | Regresión lineal + Ridge/Lasso + sesgo-varianza | Comparación con regularización |
| 5 | `Notebooks/ML_05_logistic_calibration.ipynb` | Logística + log-loss + calibración | Threshold según costo |
| 6 | `Notebooks/ML_06_knn_cv.ipynb` | KNN + escalado + CV | Grid de k y reporte |
| 7 | `Notebooks/ML_07_trees.ipynb` | Árboles + interpretabilidad + sobreajuste | Árbol vs baseline |
| 8 | `Notebooks/ML_08_random_forest.ipynb` | Random Forest + bagging + importancias | Comparativo RF/Tree |
| 9 | `Notebooks/ML_09_svm.ipynb` | SVM lineal + kernel + tuning | Reporte ROC/PR |
| 9B (opc.) | `Notebooks/ML_09B_svm_kernels.ipynb` | Kernels + visualización | (solo si aplica) |
| 10 | `Notebooks/ML_10_ann_mlp.ipynb` | ANN/MLP + regularización + early stopping | Curvas de aprendizaje |
| 11 | `Notebooks/ML_11_kmeans.ipynb` | K-Means + elección de k + silhouette | Segmentación e interpretación |
| 12 | `Notebooks/ML_12_pca.ipynb` | PCA + reducción dimensional + clustering | Reporte de componentes |
| 13 | `Notebooks/ML_13_dbscan_tsne.ipynb` | DBSCAN + t-SNE (visual) + evaluación | Comparativo de clusters |
| 14 | `Notebooks/ML_14_cv_robust_eval.ipynb` | Validación cruzada + comparación robusta | Métricas media±std |
| 15 | `Notebooks/ML_15_tuning_grid_random.ipynb` | Grid/Random search + *pipelines* | Mejor modelo reproducible |
| 15B (opc.) | `Notebooks/ML_15B_bayes_opt.ipynb` | Optimización bayesiana (Optuna) | (solo si aplica) |
| 16 | `Notebooks/ML_16_deploy_checklist.ipynb` | Despliegue mínimo + checklist + cierre | Demo + model card |

---

## Proyecto final (Unidad 7)
El proyecto integra todo el ciclo de vida del modelo: datos → preprocesamiento → modelado → evaluación → (opcional) despliegue.

### Entregables mínimos
1. **Repositorio** con estructura limpia y reproducible (README + instrucciones).
2. **Notebook principal** del experimento (pipeline completo).
3. **Reporte** (4–8 páginas o equivalente en Markdown/PDF):
   - problema, dataset, limitaciones,
   - metodología,
   - evaluación (métricas + gráficos),
   - análisis de errores,
   - discusión crítica.
4. **Presentación** (10–12 min) + preguntas.

### Rúbrica sugerida
| Criterio | Peso | Qué se evalúa |
|---|---:|---|
| Formulación y datos | 20% | claridad del objetivo, calidad/limitaciones del dataset |
| Pipeline y reproducibilidad | 20% | splits correctos, sin leakage, código limpio |
| Modelado y justificación | 20% | selección de modelos y supuestos |
| Evaluación y diagnóstico | 25% | métricas adecuadas, gráficos, análisis de error |
| Comunicación | 15% | narrativa, figuras, conclusiones y límites |

---

## Datasets recomendados (para prácticas)
- UCI Machine Learning Repository: https://archive.ics.uci.edu/
- OpenML: https://www.openml.org/search?type=data
- Kaggle Datasets: https://www.kaggle.com/datasets
- Hugging Face Datasets: https://huggingface.co/datasets
- Datos Abiertos Colombia: https://www.datos.gov.co/

---

## Materiales y guías (enlaces del repositorio)
| Sección | Descripción |
|---|---|
| `Slides/` | láminas de clase (PDF o PPT) |
| `Notebooks/` | notebooks semanales (01–16) |
| `Assignments/` | guías de ejercicios, fechas y rúbricas |
| `Project/` | plantilla de proyecto, checklist, ejemplos |
| `Utils/` | funciones comunes (plots, métricas, helpers) |
