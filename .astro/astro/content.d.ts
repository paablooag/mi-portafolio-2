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
"api-composition-patterns.md": {
	id: "api-composition-patterns.md";
  slug: "api-composition-patterns";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"barney-paginas-web-vida-real.md": {
	id: "barney-paginas-web-vida-real.md";
  slug: "barney-paginas-web-vida-real";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"como-empezar-freelance-developer.md": {
	id: "como-empezar-freelance-developer.md";
  slug: "como-empezar-freelance-developer";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"componentes-reutilizables-vue.md": {
	id: "componentes-reutilizables-vue.md";
  slug: "componentes-reutilizables-vue";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"composables-vue3.md": {
	id: "composables-vue3.md";
  slug: "composables-vue3";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"core-web-vitals-guia.md": {
	id: "core-web-vitals-guia.md";
  slug: "core-web-vitals-guia";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"crecimiento-profesional-desarrollo.md": {
	id: "crecimiento-profesional-desarrollo.md";
  slug: "crecimiento-profesional-desarrollo";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"css-grid-layout.md": {
	id: "css-grid-layout.md";
  slug: "css-grid-layout";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"dam-vs-daw-desarrollo-web.md": {
	id: "dam-vs-daw-desarrollo-web.md";
  slug: "dam-vs-daw-desarrollo-web";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"estrategias-buscar-trabajo-tech.md": {
	id: "estrategias-buscar-trabajo-tech.md";
  slug: "estrategias-buscar-trabajo-tech";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"figma-para-desarrolladores.md": {
	id: "figma-para-desarrolladores.md";
  slug: "figma-para-desarrolladores";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"git-workflow-eficiente.md": {
	id: "git-workflow-eficiente.md";
  slug: "git-workflow-eficiente";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"javascript-moderno-2024.md": {
	id: "javascript-moderno-2024.md";
  slug: "javascript-moderno-2024";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"lighthouse-optimizacion.md": {
	id: "lighthouse-optimizacion.md";
  slug: "lighthouse-optimizacion";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"linkedin-desarrolladores-guia.md": {
	id: "linkedin-desarrolladores-guia.md";
  slug: "linkedin-desarrolladores-guia";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"mejores-practicas-frontend.md": {
	id: "mejores-practicas-frontend.md";
  slug: "mejores-practicas-frontend";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"mejores-practicas-trabajo-remoto.md": {
	id: "mejores-practicas-trabajo-remoto.md";
  slug: "mejores-practicas-trabajo-remoto";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"migracion-vue-a-nuxt.md": {
	id: "migracion-vue-a-nuxt.md";
  slug: "migracion-vue-a-nuxt";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"negociacion-salarial-tech.md": {
	id: "negociacion-salarial-tech.md";
  slug: "negociacion-salarial-tech";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"networking-industria-tech.md": {
	id: "networking-industria-tech.md";
  slug: "networking-industria-tech";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"nuxt-deployment-guia.md": {
	id: "nuxt-deployment-guia.md";
  slug: "nuxt-deployment-guia";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"nuxt-modules-esenciales.md": {
	id: "nuxt-modules-esenciales.md";
  slug: "nuxt-modules-esenciales";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"optimizacion-seo-nuxt.md": {
	id: "optimizacion-seo-nuxt.md";
  slug: "optimizacion-seo-nuxt";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"pinia-vs-vuex.md": {
	id: "pinia-vs-vuex.md";
  slug: "pinia-vs-vuex";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"portafolio-desarrollador-efectivo.md": {
	id: "portafolio-desarrollador-efectivo.md";
  slug: "portafolio-desarrollador-efectivo";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"responsive-design-2024.md": {
	id: "responsive-design-2024.md";
  slug: "responsive-design-2024";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"roadmap-desarrollador-sector-deportivo.md": {
	id: "roadmap-desarrollador-sector-deportivo.md";
  slug: "roadmap-desarrollador-sector-deportivo";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"scrum-desarrollo-web.md": {
	id: "scrum-desarrollo-web.md";
  slug: "scrum-desarrollo-web";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"seo-contenido-estrategia.md": {
	id: "seo-contenido-estrategia.md";
  slug: "seo-contenido-estrategia";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"seo-tecnico-checklist.md": {
	id: "seo-tecnico-checklist.md";
  slug: "seo-tecnico-checklist";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"tailwind-tips-avanzados.md": {
	id: "tailwind-tips-avanzados.md";
  slug: "tailwind-tips-avanzados";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"vscode-setup-2024.md": {
	id: "vscode-setup-2024.md";
  slug: "vscode-setup-2024";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"vue-testing-jest.md": {
	id: "vue-testing-jest.md";
  slug: "vue-testing-jest";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"web-accessibility-a11y.md": {
	id: "web-accessibility-a11y.md";
  slug: "web-accessibility-a11y";
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
