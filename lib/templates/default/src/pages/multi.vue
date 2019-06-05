<script>
import SimpleView from '@/components/pages/muitl/SimpleView';
import ComplexView from '@/components/pages/muitl/ComplexView';
import NotFound from '@/pages/notfound';

export default {
  data() {
    return {
      view: 'SimpleView'
    }
  },

  methods: {
    changeView(view) {
      this.view = view;
    }
  },

  render() {
    const props = {
      props: {
        // data
      },
      on: {
        // methods
        changeView: this.changeView
      },
    };

    if (this.view === 'SimpleView') return <SimpleView {...props} />;
    if (this.view === 'ComplexView') return <ComplexView {...props} />;
    return <NotFound />;
  }
}
</script>
