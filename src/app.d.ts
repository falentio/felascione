// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface PrivateEnv {}
	interface PublicEnv {
		PUBLIC_NORY_URL: string;
	}
	// interface Session {}
	// interface Stuff {}
}

declare const __BUILD_TIMESTAMP__: number;
