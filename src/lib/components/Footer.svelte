<script lang="ts">
	import { format } from "date-fns"
	import id from "date-fns/locale/id/index.js"

	const date = format(__BUILD_TIMESTAMP__, "HH:m, d LLLL y", { locale: id })
</script>

<section class="bg-zinc-900 p-2 text-gray-100 flex flex-col text-center">
	<span> Terakhir di edit: {date}</span>
	<span> Dibuat oleh Siswa XII MIPA 1</span>
	<span class="text-center">&copy; 2022</span>
</section>
