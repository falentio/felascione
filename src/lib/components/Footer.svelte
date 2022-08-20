<script lang="ts">
	import { formatDistanceToNow } from "date-fns";
	import locale from "date-fns/locale/id/index.js";

	const lastEdit = formatDistanceToNow(__BUILD_TIMESTAMP__, { locale, addSuffix: true });
</script>

<section class="bg-zinc-900 p-2 text-gray-100 flex flex-col text-center">
	<span> Terakhir di edit: {lastEdit}</span>
	<span> Dibuat oleh Siswa XII MIPA 1</span>
	<span class="text-center">&copy; 2022</span>
</section>
