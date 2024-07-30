<template>
    <div class="jl-card max-width-500 ml-auto mr-auto mt60">
        <h2>Tenant List</h2>
        <JLSelect :options="options" label="companyName" :loading="isLoading" v-model="selected">
        </JLSelect>
        <div class="flex mt12">
            <Button :disabled="!selected" label="Submit" @onClick="submitTenantList" width="100px" classes="jl-button-green" />
        </div>
    </div>
</template>

<script>

import {Button, JLSelect} from "../lib/jl-components.min.js";
import {getAppTokenByTenantId, getCompany} from "../services/company.service.js";
import {toggleSpinnerModal} from "../utils/loading.js";
import {addErrorMessage, addSuccessMessage} from "../utils/notify.js";

export default {
    name: 'Company',
    components: {
        JLSelect,
        Button
    },
    data() {
        return {
            selected: null,
            options: [],
            isLoading: false
        }
    },
    methods: {
        getAppToken(id) {
            toggleSpinnerModal(true);
            getAppTokenByTenantId(id).then((res) => {
                if (res.success) {
                    addSuccessMessage('Get token tenant app successfully!')
                    this.$router.push('/');
                }
            }).catch(() => {
                addErrorMessage('Failed to get token, try again!')
            }).finally(() => {
                toggleSpinnerModal(false);
            })
        },
        submitTenantList() {
            if (this.selected?.tenantId) {
                this.getAppToken(this.selected.tenantId)
            }
        }
    },
    async created () {
        this.isLoading = true;
        const result = await getCompany();
        this.isLoading = false;
        if (Array.isArray(result.additionalData)) {
            this.options = result.additionalData;
            //just one tenant auto submit
            if (result.additionalData.length === 1) {
                const id = result.additionalData[0].tenantId
                this.getAppToken(id);
            }
        }
    }
}
</script>