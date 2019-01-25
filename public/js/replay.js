const host = '';
const allTablesUrl = host + '/operationRecord/getAllTables',
  queryUrl = host + '/operationRecord/query';

const app = new Vue({
  el: '#app',
  data() {
    return {
      loading: true,
      tables: [],
      cache: {},
      activeIndex: '0',
      centerDialogVisible: false,
      dialogTitle: '',
      table: '',
      totalSize: 0,
      pageSize: localStorage.getItem('pageSize') === null ? 10 : Number(localStorage.getItem('pageSize')),
      playBtnX: localStorage.getItem('x') === null ? 'auto' : localStorage.getItem('x'),
      playBtnY: localStorage.getItem('y') === null ? '20px' : localStorage.getItem('y'),
      currentPage: 1,
      showMultipleBtn: false,
      isCollapse: true,
      tableData: [],
      multipleSelection: []
    };
  },
  created() {
    this.getAllTables().then(() => {
      this.query();
    });
  },
  methods: {
    tableRowClassName({ row }) {
      if (Number(row.isReport) !== 0) {
        return 'warning-row';
      };
      return '';
    },
    getAllTables() {
      return axios.post(allTablesUrl).then((res) => {
        this.tables = res.data;
        this.table = res.data[0].en;
      });
    },
    query() {
      this.loading = true;
      axios.get(queryUrl, {
        params: {
          table: this.table,
          page: this.currentPage,
          pageSize: this.pageSize
        }
      }).then((res) => {
        this.totalSize = res.data.totalSize;
        this.tableData = res.data.list;
        this.loading = false;
      });
    },
    handleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      if (val.length > 1) {
        this.showMultipleBtn = true;
      } else {
        this.showMultipleBtn = false;
      };
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      localStorage.setItem('pageSize', val);
      this.query();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.query();
    },
    moveBtn() {
      const that = this;
      const [minX, minY, maxX, maxY] = [0, 0, document.body.clientWidth - 40, document.body.clientHeight - 40];
      function moveBtn(e) {
        let [x, y] = [e.clientX - 20, e.clientY - 20];
        if (x <= minX) {
          x = minX;
        } else if (x >= maxX) {
          x = maxX;
        };
        if (y <= minY) {
          y = minY;
        } else if (y >= maxY) {
          y = maxY;
        };
        that.playBtnX = x + 'px';
        that.playBtnY = y + 'px';
      };
      document.addEventListener('mousemove', moveBtn);
      document.addEventListener('mouseup', (e) => {
        document.removeEventListener('mousemove', moveBtn);
        localStorage.setItem('x', e.clientX - 20 + 'px');
        localStorage.setItem('y', e.clientY - 20 + 'px');
      });
    },
    handlePlayOne(index, row) {
      this.dialogTitle = `上报人：${row.name}`;
      this.centerDialogVisible = true;
      const key = `p${this.currentPage}i${index}`;
      if (this.cache[key] === undefined) {
        axios.get(`${host}/${row.dataFile}`).then((res) => {
          this.cache[key] = res.data;
          new rrwebPlayer({
            target: document.querySelector('#player'), // 可以自定义 DOM 元素
            data: {
              events: res.data,
            },
          });
        });
      } else {
        new rrwebPlayer({
          target: document.querySelector('#player'), // 可以自定义 DOM 元素
          data: {
            events: this.cache[key],
          },
        });
      };
    },
    handleClose() {
      document.querySelector('.rr-player').parentNode.removeChild(document.querySelector('.rr-player'));
    },
    clickMenu(item, index) {
      console.log(item, index);
    }
  }
});
