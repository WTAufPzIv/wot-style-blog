<template>
	<CommonWrapper>
		<div class="main-content">
			<div class="blog-list-wrapper">
				<ListFilter ref="ListFilterRef"></ListFilter>
				<div class="main-list-wrapper">
					<BlogListSkeleton v-if="loading" only-list></BlogListSkeleton>
					<n-collapse-transition :show="!loading">
						<div class="empty-wrapper" :style="{ minHeight: '500px' }" v-if="!arrPayload?.length">
							<n-empty description="无数据">
								<template #icon>
									<n-icon>
										<IosAirplane />
									</n-icon>
								</template>
							</n-empty>
						</div>
						<BlogList v-else :arrPayload="arrPayload" :isAdmin="!!admin"></BlogList>
					</n-collapse-transition>
				</div>
				<n-pagination class="mt30" :page="pageIndex" :page-count="pageCount" />
			</div>
		</div>
	</CommonWrapper>
</template>

<script setup lang="ts">
import CommonWrapper from "@/components/commonWrapper/index.vue";
import ListFilter from "./listFilter.vue";
import BlogList from "@/components/blogList/index.vue";
import { computed, onMounted, ref, watchEffect } from "vue";
import BlogListSkeleton from "@/components/skeleton/blogListSkeleton.vue";
import { getAllCategory, getBlogList } from "@/api/modules/main";
import { IosAirplane } from "@vicons/ionicons4";
import { useAdminHook } from "@/hook/adminHook";

const ListFilterRef = ref();
const loading = ref(true);
const arrPayload = ref();
const pageIndex = ref(1);
const pageSize = ref(9);
const { handleCheck } = useAdminHook();
const pageCount = ref(0);
const admin = ref();
const fetParams = computed(() => {
	return {
		pageIndex: pageIndex.value,
		pageSize: 8,
		...(ListFilterRef.value?.searchParams || {})
	};
});

watchEffect(async () => {
	loading.value = true;
	const res = await getBlogList(fetParams.value);
	console.log(fetParams.value);
	arrPayload.value = res.data.data;
	pageCount.value = res.data.pageCount;
	loading.value = false;
});

onMounted(async () => {
	const res = await handleCheck();
	admin.value = res;
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
