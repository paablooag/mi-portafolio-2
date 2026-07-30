declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"astro-guia-completa-2025.md": {
	id: "astro-guia-completa-2025.md";
  slug: "astro-guia-completa-2025";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"astro-seo-optimizacion.md": {
	id: "astro-seo-optimizacion.md";
  slug: "astro-seo-optimizacion";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"claude-code-guia-desarrolladores.md": {
	id: "claude-code-guia-desarrolladores.md";
  slug: "claude-code-guia-desarrolladores";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"claude-guia-completa-2025.md": {
	id: "claude-guia-completa-2025.md";
  slug: "claude-guia-completa-2025";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"como-encontrar-trabajo-frontend-2025.md": {
	id: "como-encontrar-trabajo-frontend-2025.md";
  slug: "como-encontrar-trabajo-frontend-2025";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"como-funciona-el-algoritmo-google.md": {
	id: "como-funciona-el-algoritmo-google.md";
  slug: "como-funciona-el-algoritmo-google";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"como-preparar-entrevista-tecnica.md": {
	id: "como-preparar-entrevista-tecnica.md";
  slug: "como-preparar-entrevista-tecnica";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"core-web-vitals-2025.md": {
	id: "core-web-vitals-2025.md";
  slug: "core-web-vitals-2025";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"cuanto-cuesta-ia-empresa.md": {
	id: "cuanto-cuesta-ia-empresa.md";
  slug: "cuanto-cuesta-ia-empresa";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"cursor-vs-copilot-vs-claude-code.md": {
	id: "cursor-vs-copilot-vs-claude-code.md";
  slug: "cursor-vs-copilot-vs-claude-code";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"de-junior-a-mid-senior.md": {
	id: "de-junior-a-mid-senior.md";
  slug: "de-junior-a-mid-senior";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"documentar-proyectos-con-ia.md": {
	id: "documentar-proyectos-con-ia.md";
  slug: "documentar-proyectos-con-ia";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"errores-entrevista-tecnica.md": {
	id: "errores-entrevista-tecnica.md";
  slug: "errores-entrevista-tecnica";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"errores-seo-que-matan-tu-web.md": {
	id: "errores-seo-que-matan-tu-web.md";
  slug: "errores-seo-que-matan-tu-web";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"fable-5-anthropic.md": {
	id: "fable-5-anthropic.md";
  slug: "fable-5-anthropic";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"futuro-ecosistema-vue-nuxt.md": {
	id: "futuro-ecosistema-vue-nuxt.md";
  slug: "futuro-ecosistema-vue-nuxt";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"github-para-la-busqueda-de-empleo.md": {
	id: "github-para-la-busqueda-de-empleo.md";
  slug: "github-para-la-busqueda-de-empleo";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"habilidades-frontend-demandadas-2025.md": {
	id: "habilidades-frontend-demandadas-2025.md";
  slug: "habilidades-frontend-demandadas-2025";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"ia-en-flujo-de-trabajo-dev.md": {
	id: "ia-en-flujo-de-trabajo-dev.md";
  slug: "ia-en-flujo-de-trabajo-dev";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"ia-open-source-vs-cloud.md": {
	id: "ia-open-source-vs-cloud.md";
  slug: "ia-open-source-vs-cloud";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"ia-para-generar-tests.md": {
	id: "ia-para-generar-tests.md";
  slug: "ia-para-generar-tests";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"ia-para-refactoring-codigo.md": {
	id: "ia-para-refactoring-codigo.md";
  slug: "ia-para-refactoring-codigo";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"investigacion-palabras-clave.md": {
	id: "investigacion-palabras-clave.md";
  slug: "investigacion-palabras-clave";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"link-building-estrategias-2025.md": {
	id: "link-building-estrategias-2025.md";
  slug: "link-building-estrategias-2025";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"linkedin-para-desarrolladores-frontend.md": {
	id: "linkedin-para-desarrolladores-frontend.md";
  slug: "linkedin-para-desarrolladores-frontend";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"live-coding-como-destacar.md": {
	id: "live-coding-como-destacar.md";
  slug: "live-coding-como-destacar";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"llm-para-desarrolladores.md": {
	id: "llm-para-desarrolladores.md";
  slug: "llm-para-desarrolladores";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"mejores-ias-para-programar-2025.md": {
	id: "mejores-ias-para-programar-2025.md";
  slug: "mejores-ias-para-programar-2025";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"mejores-prompts-para-programar.md": {
	id: "mejores-prompts-para-programar.md";
  slug: "mejores-prompts-para-programar";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"migracion-nuxt3-nuxt4.md": {
	id: "migracion-nuxt3-nuxt4.md";
  slug: "migracion-nuxt3-nuxt4";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"migrar-proyectos-con-ia.md": {
	id: "migrar-proyectos-con-ia.md";
  slug: "migrar-proyectos-con-ia";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"migrar-vue-a-astro-con-ia.md": {
	id: "migrar-vue-a-astro-con-ia.md";
  slug: "migrar-vue-a-astro-con-ia";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"negociar-salario-oferta-tech.md": {
	id: "negociar-salario-oferta-tech.md";
  slug: "negociar-salario-oferta-tech";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"nuxt4-novedades-guia.md": {
	id: "nuxt4-novedades-guia.md";
  slug: "nuxt4-novedades-guia";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"nuxt5-que-esperar.md": {
	id: "nuxt5-que-esperar.md";
  slug: "nuxt5-que-esperar";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"ollama-guia-completa.md": {
	id: "ollama-guia-completa.md";
  slug: "ollama-guia-completa";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"portfolio-frontend-que-impresiona.md": {
	id: "portfolio-frontend-que-impresiona.md";
  slug: "portfolio-frontend-que-impresiona";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"precios-apis-ia-2025.md": {
	id: "precios-apis-ia-2025.md";
  slug: "precios-apis-ia-2025";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"preguntas-javascript-entrevista.md": {
	id: "preguntas-javascript-entrevista.md";
  slug: "preguntas-javascript-entrevista";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"preguntas-vue-nuxt-entrevista.md": {
	id: "preguntas-vue-nuxt-entrevista.md";
  slug: "preguntas-vue-nuxt-entrevista";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"prompt-engineering-guia.md": {
	id: "prompt-engineering-guia.md";
  slug: "prompt-engineering-guia";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"proyectos-personales-para-encontrar-trabajo.md": {
	id: "proyectos-personales-para-encontrar-trabajo.md";
  slug: "proyectos-personales-para-encontrar-trabajo";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"que-es-el-seo.md": {
	id: "que-es-el-seo.md";
  slug: "que-es-el-seo";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"que-es-un-llm.md": {
	id: "que-es-un-llm.md";
  slug: "que-es-un-llm";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"rag-sistemas-recuperacion.md": {
	id: "rag-sistemas-recuperacion.md";
  slug: "rag-sistemas-recuperacion";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"seo-local-negocio.md": {
	id: "seo-local-negocio.md";
  slug: "seo-local-negocio";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"seo-on-page-checklist.md": {
	id: "seo-on-page-checklist.md";
  slug: "seo-on-page-checklist";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"seo-para-desarrolladores-web.md": {
	id: "seo-para-desarrolladores-web.md";
  slug: "seo-para-desarrolladores-web";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"seo-tecnico-guia.md": {
	id: "seo-tecnico-guia.md";
  slug: "seo-tecnico-guia";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"soft-skills-desarrollador.md": {
	id: "soft-skills-desarrollador.md";
  slug: "soft-skills-desarrollador";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		"blog-en": Record<string, {
  id: string;
  collection: "blog-en";
  data: any;
}>;

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
