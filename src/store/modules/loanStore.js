import { observable, flow } from 'mobx';
import { getBannerList } from '~api/index';

class LoanStore {
    @observable
    bannerList = []
    @observable
    bannerPlayFlag = false

    getBannerList = flow(function* () {
        const data = yield getBannerList({ pageSize: 100 });
        if (data.code === 200) {
            this.bannerList = data.data;
            setTimeout(() => {
                this.bannerPlayFlag = true;
            })
        }
    })
}
export default new LoanStore();