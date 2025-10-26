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
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"ats-cv-optimizacion.md": {
	id: "ats-cv-optimizacion.md";
  slug: "ats-cv-optimizacion";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"barney-paginas-web-vida-real.md": {
	id: "barney-paginas-web-vida-real.md";
  slug: "barney-paginas-web-vida-real";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"como-conseguir-clientes-desarrollador.md": {
	id: "como-conseguir-clientes-desarrollador.md";
  slug: "como-conseguir-clientes-desarrollador";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"como-empezar-freelance-developer.md": {
	id: "como-empezar-freelance-developer.md";
  slug: "como-empezar-freelance-developer";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"como-encontrar-trabajo-remoto.md": {
	id: "como-encontrar-trabajo-remoto.md";
  slug: "como-encontrar-trabajo-remoto";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"como-ser-freelance-frontend.md": {
	id: "como-ser-freelance-frontend.md";
  slug: "como-ser-freelance-frontend";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"componentes-reutilizables-vue.md": {
	id: "componentes-reutilizables-vue.md";
  slug: "componentes-reutilizables-vue";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"composables-vue3.md": {
	id: "composables-vue3.md";
  slug: "composables-vue3";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"core-web-vitals-guia.md": {
	id: "core-web-vitals-guia.md";
  slug: "core-web-vitals-guia";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"crecimiento-profesional-desarrollo.md": {
	id: "crecimiento-profesional-desarrollo.md";
  slug: "crecimiento-profesional-desarrollo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"css-grid-layout.md": {
	id: "css-grid-layout.md";
  slug: "css-grid-layout";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"dam-vs-daw-desarrollo-web.md": {
	id: "dam-vs-daw-desarrollo-web.md";
  slug: "dam-vs-daw-desarrollo-web";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"desarrollador-ia-guia-completa.md": {
	id: "desarrollador-ia-guia-completa.md";
  slug: "desarrollador-ia-guia-completa";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"devops-por-que-estudiarlo.md": {
	id: "devops-por-que-estudiarlo.md";
  slug: "devops-por-que-estudiarlo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"docker-desarrolladores-frontend.md": {
	id: "docker-desarrolladores-frontend.md";
  slug: "docker-desarrolladores-frontend";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"estrategias-buscar-trabajo-tech.md": {
	id: "estrategias-buscar-trabajo-tech.md";
  slug: "estrategias-buscar-trabajo-tech";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"figma-para-desarrolladores.md": {
	id: "figma-para-desarrolladores.md";
  slug: "figma-para-desarrolladores";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"git-workflow-eficiente.md": {
	id: "git-workflow-eficiente.md";
  slug: "git-workflow-eficiente";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"graphql-vs-rest-api.md": {
	id: "graphql-vs-rest-api.md";
  slug: "graphql-vs-rest-api";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"javascript-moderno-2024.md": {
	id: "javascript-moderno-2024.md";
  slug: "javascript-moderno-2024";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"lighthouse-optimizacion.md": {
	id: "lighthouse-optimizacion.md";
  slug: "lighthouse-optimizacion";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"linkedin-desarrolladores-guia.md": {
	id: "linkedin-desarrolladores-guia.md";
  slug: "linkedin-desarrolladores-guia";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mejores-influencers-frontend-2024.md": {
	id: "mejores-influencers-frontend-2024.md";
  slug: "mejores-influencers-frontend-2024";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mejores-practicas-frontend.md": {
	id: "mejores-practicas-frontend.md";
  slug: "mejores-practicas-frontend";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mejores-practicas-trabajo-remoto.md": {
	id: "mejores-practicas-trabajo-remoto.md";
  slug: "mejores-practicas-trabajo-remoto";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"microservicios-vs-monolito.md": {
	id: "microservicios-vs-monolito.md";
  slug: "microservicios-vs-monolito";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"migracion-vue-a-nuxt.md": {
	id: "migracion-vue-a-nuxt.md";
  slug: "migracion-vue-a-nuxt";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"negociacion-salarial-tech.md": {
	id: "negociacion-salarial-tech.md";
  slug: "negociacion-salarial-tech";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"networking-industria-tech.md": {
	id: "networking-industria-tech.md";
  slug: "networking-industria-tech";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"nuxt-deployment-guia.md": {
	id: "nuxt-deployment-guia.md";
  slug: "nuxt-deployment-guia";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"nuxt-modules-esenciales.md": {
	id: "nuxt-modules-esenciales.md";
  slug: "nuxt-modules-esenciales";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"nuxt4-vs-nuxt3-comparacion.md": {
	id: "nuxt4-vs-nuxt3-comparacion.md";
  slug: "nuxt4-vs-nuxt3-comparacion";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"optimizacion-seo-nuxt.md": {
	id: "optimizacion-seo-nuxt.md";
  slug: "optimizacion-seo-nuxt";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"performance-web-core-web-vitals.md": {
	id: "performance-web-core-web-vitals.md";
  slug: "performance-web-core-web-vitals";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"pinia-vs-vuex.md": {
	id: "pinia-vs-vuex.md";
  slug: "pinia-vs-vuex";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"por-que-contratar-desarrollador-frontend.md": {
	id: "por-que-contratar-desarrollador-frontend.md";
  slug: "por-que-contratar-desarrollador-frontend";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"portafolio-desarrollador-efectivo.md": {
	id: "portafolio-desarrollador-efectivo.md";
  slug: "portafolio-desarrollador-efectivo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"progressive-web-apps-pwa.md": {
	id: "progressive-web-apps-pwa.md";
  slug: "progressive-web-apps-pwa";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"react-vs-vue-vs-angular-2024.md": {
	id: "react-vs-vue-vs-angular-2024.md";
  slug: "react-vs-vue-vs-angular-2024";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"responsive-design-2024.md": {
	id: "responsive-design-2024.md";
  slug: "responsive-design-2024";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"roadmap-desarrollador-sector-deportivo.md": {
	id: "roadmap-desarrollador-sector-deportivo.md";
  slug: "roadmap-desarrollador-sector-deportivo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"salarios-desarrolladores-frontend-backend-2024.md": {
	id: "salarios-desarrolladores-frontend-backend-2024.md";
  slug: "salarios-desarrolladores-frontend-backend-2024";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"scrum-desarrollo-web.md": {
	id: "scrum-desarrollo-web.md";
  slug: "scrum-desarrollo-web";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"seo-contenido-estrategia.md": {
	id: "seo-contenido-estrategia.md";
  slug: "seo-contenido-estrategia";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"seo-tecnico-checklist.md": {
	id: "seo-tecnico-checklist.md";
  slug: "seo-tecnico-checklist";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"serverless-jamstack.md": {
	id: "serverless-jamstack.md";
  slug: "serverless-jamstack";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"tailwind-tips-avanzados.md": {
	id: "tailwind-tips-avanzados.md";
  slug: "tailwind-tips-avanzados";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"testing-frontend-jest-cypress.md": {
	id: "testing-frontend-jest-cypress.md";
  slug: "testing-frontend-jest-cypress";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"typescript-para-principiantes.md": {
	id: "typescript-para-principiantes.md";
  slug: "typescript-para-principiantes";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"vscode-setup-2024.md": {
	id: "vscode-setup-2024.md";
  slug: "vscode-setup-2024";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"vue-testing-jest.md": {
	id: "vue-testing-jest.md";
  slug: "vue-testing-jest";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"web-accessibility-a11y.md": {
	id: "web-accessibility-a11y.md";
  slug: "web-accessibility-a11y";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"webassembly-frontend.md": {
	id: "webassembly-frontend.md";
  slug: "webassembly-frontend";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
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

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
