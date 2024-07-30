<template>
  <div :style="{ margin: '0 24px' }">
    <nav class="nav-bar">
      <h2>Suspend Customer</h2>
      <Button label="Log out" @onClick="handleClickLogout" classes="jl-button-red">
        <JlIcon fontName="jl-export"></JlIcon>
      </Button>
    </nav>
    <JLTable :t="() => { }" name="customer-table" :columns="columns" :data-source="dataSource" @on-sort-by="onSortBy"
      @on-draggable="onDraggable" @on-filter-action="onFilterAction">
      <template slot="filter-body" slot-scope="{ onFilter }">
        <div class="row search-group">
          <div class="form-group">
            <label for="Search"><span class="jl-localization">Search</span></label>
            <input v-model="SearchTerm" name="SearchTerm" type="text" class="form-control"
              placeholder="Enter search term Name / Address / Account Number / Account Manager / Contact Name..."
              @input="onFilter({ SearchTerm })" />
          </div>
          <Button @onClick="handleSearchCustomer" width="100px" classes="jl-button-skyblue"
            :style="{ marginBottom: '-10px' }">
            <JlIcon fontName="jl-magnify" />
            Search
          </Button>
        </div>
        <div style="text-align: right">
          <JLTableSetting :t="(name) => name" :columns="columns" :data-source-length="dataSource.length"
            @on-save-view-settings="onSaveViewSettings" @on-reset-settings="onResetColumnSettings" />
        </div>
      </template>
      <template v-slot:tds="{ item, col, displayFor }">
        <div v-if="displayFor(col, 'name')" class="customer-name-row">
          <div class="full-width">
            <a data-toggle="tooltip" :header-title="item.name">
              {{ item.name }}
            </a>
          </div>
          <button class="quick-view ml12" @click="handleClickSuspend(item)">
            <JLTooltip content="<b>Click to suspend customer</b>" :position="{ direction: 'top', arrow: 'center' }"
              theme="dark">
              <JlIcon fontName="jl-cancel" :style="{ color: 'red' }"></JlIcon>
            </JLTooltip>
          </button>
        </div>
        <div v-else-if="displayFor(col, 'accountManager')">
          {{ item.accountManager }}
        </div>
        <div v-else-if="displayFor(col, 'accountNumber')">
          {{ item.accountNumber }}
        </div>
        <div v-else-if="displayFor(col, 'address1')">{{ item.address }}</div>
        <div v-else-if="displayFor(col, 'postCode')">{{ item.postCode }}</div>
        <div v-else-if="displayFor(col, 'contact')">{{ item.contact }}</div>
        <div v-else-if="displayFor(col, 'telephone')">
          <a :href="'tel:' + item.telephone">{{ item.telephone }}</a>
        </div>
        <div v-else-if="displayFor(col, 'emailAddress')">
          <a :href="'mailto:' + item.emailAddress">
            {{ item.emailAddress }}
          </a>
        </div>
      </template>
    </JLTable>

    <JLPaging v-if="totalCount > 0" class="table-paging" name="customer-paging" :t="(name) => name"
      :totalCount="totalCount" :default-page-size="pageSize" :default-page-index="pageIndex"
      @page-change="onPageChange" />

    <JLModal v-model="openSuspendModal" title="Confirm" size="lg">
      <div class="modal-body">
        <span>Ensure that suspending a customer will:</span>
        <ul class="suspend-condition">
          <li>Suspend all sites related to the customer.</li>
          <li>Suspend all sites related to the customer.</li>
          <li>Suspend all site assets related to those sites.</li>
          <li>Suspend/Cancel all jobs against those sites.</li>
          <li>Suspend all PPM (Planned Preventive Maintenance) contracts related to those sites.</li>
        </ul>
        <p>
          Any Job related to the PPM will be cancelled.<br>
          Are you sure to continue suspend this customer?
        </p>
      </div>
      <div slot="modal-footer">
        <Button label="Cancel" classes="jl-button-gray mr12" @onClick="openSuspendModal = false" />
        <Button label="Confirm" classes="jl-button-green" @onClick="handleConfirmSuspend" :disabled="isInProgress" />
      </div>
    </JLModal>
  </div>
</template>

<script>
import {
  Button,
  JlIcon,
  JLTable,
  JLTableSetting,
  JLTooltip,
  JLModal,
  JLPaging,
} from "../../lib/jl-components.min.js";
import { columns, DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, CustomerOrderBy } from "./constant.js";
import {
  getCustomerList,
  suspendCustomer,
} from "../../services/customer.service.js";
import { addErrorMessage, addSuccessMessage } from "../../utils/notify.js";
import { toggleSpinnerModal } from "../../utils/loading.js";
import { buildEndSessionUrl } from "../../utils/index.js";
import { STORAGE_KEY } from "../../utils/const.js";

export default {
  name: "CustomerList",
  components: {
    JLTable,
    JLTableSetting,
    Button,
    JLTooltip,
    JlIcon,
    JLModal,
    JLPaging,
  },
  data() {
    return {
      columns,
      SearchTerm: "",
      dataSource: [],
      dataSourceRoot: [],
      totalCount: 0,
      pageIndex: DEFAULT_PAGE_INDEX,
      pageSize: DEFAULT_PAGE_SIZE,
      openSuspendModal: false,
      suspendItem: null,
      isInProgress: false,
      orderBy: 0,
    };
  },
  created() {
    this.fetchCustomerData();
  },
  methods: {
    handleSearchCustomer() {
      this.fetchCustomerData({ searchTerm: this.SearchTerm, orderBy: this.orderBy });
    },

    async fetchCustomerData({ searchTerm, orderBy = 0 } = {}) {
      toggleSpinnerModal(true);
      const payload = {
        PageIndex: this.pageIndex,
        PageSize: this.pageSize,
        SearchTerm: searchTerm,
        OrderBy: orderBy,
      };
      const data = await getCustomerList(payload);
      this.dataSource = data?.additionalData.customers || [];
      this.totalCount = data?.additionalData.totalCount || 0;
      toggleSpinnerModal(false);
    },

    onSortBy(newColumn) {
      this.columns = this.columns.map((e) =>
        e.columnId === newColumn.columnId ? newColumn : { ...e, orderBy: null }
      );
      this.handleSort(newColumn);
    },

    onDraggable(newDataSource) {
      this.dataSource = newDataSource;
    },

    onSaveViewSettings(newColumns, device) {
      this.columns = newColumns;
    },

    onResetColumnSettings() {
      this.columns = columns;
    },

    onFilterAction(payload) {
      // this.handleFilter();
    },

    handleFilter() {
      const newData = [].filter((e) => e.Name.indexOf(this.SearchTerm) >= 0);
      this.dataSource = newData.slice(
        (this.pageIndex - 1 || 0) * (this.pageSize ?? 0),
        (this.pageSize ?? 0) * (this.pageIndex ?? 0)
      );

      this.dataSourceRoot = newData;
    },

    handleSort(newColumn) {
      const { name, orderBy } = newColumn ?? {};
      if (name) {
        const order = CustomerOrderBy[`${name.toUpperCase()}_${orderBy === "desc" ? 'DESC' : 'ASC'}`];
        this.orderBy = order;
        this.fetchCustomerData({
          orderBy: order,
        })
      }
    },

    handleClickSuspend(item) {
      this.openSuspendModal = true;
      this.suspendItem = item;
    },

    async handleConfirmSuspend() {
      this.isInProgress = true;

      const id = this.suspendItem?.id;
      const response = await suspendCustomer(id);
      if (response?.success) {
        addSuccessMessage("Suspend customer successfully!");
        this.openSuspendModal = false;
        this.pageIndex = 1;
        this.fetchCustomerData();
      } else {
        addErrorMessage(response?.message);
      }
      this.isInProgress = false;
    },

    onPageChange(pager) {
      const { pageIndex, pageSize } = pager || {};
      this.pageIndex = pageIndex;
      this.pageSize = pageSize;
      this.fetchCustomerData();
    },

    handleClickLogout() {
      const idToken = localStorage.getItem(STORAGE_KEY.IDENTITY_ID_TOKEN) || "";
      const url = buildEndSessionUrl(idToken);

      localStorage.removeItem(STORAGE_KEY.IDENTITY_ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEY.IDENTITY_REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_KEY.IDENTITY_ID_TOKEN);
      localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
      window.location.replace(url);
    },
  },
};
</script>

<style lang="scss" scoped>
.search-group {
  display: flex;
  align-items: center;
  gap: 10px;
  column-gap: 15px;
  margin-bottom: 5px;

  >div:nth-child(1) {
    flex-basis: 80%;
  }
}

.table-paging {
  margin-top: 12px;
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
}

.suspend-condition {
  font-weight: 600;
  line-height: 1.8;
}
</style>