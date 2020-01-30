
<template>
  <div>
    <div v-for="(line, index) in lines" v-bind:key="index" class="row">
      // eslint-disable-next-line vue/valid-v-model
      <label
        v-model="line.countryCode"
        float-label="Country Code"
        :options="countryPhoneCodes"
      ></label>
      // eslint-disable-next-line vue/valid-v-model
      <label
        v-model="line.phoneUsageType"
        float-label="Type of Usage"
        :options="phoneUsageTypes"
      ></label>
    </div>

    <button @click="removeLine(index)" icon="delete" round />
    <button v-if="index + 1 === lines.length" @click="addLine" icon="playlist-plus" round />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

interface IPhoneUsageType {
  label: string;
  value: string;
}

@Component
export default class DynamicComponent extends Vue {
  lines!: {
    countryCode: string | undefined;
    number: string | undefined;
    phoneUsageType: string;
  }[];
  blockRemoval: boolean;
  phoneUsageTypes: IPhoneUsageType[];
  countryPhoneCodes: IPhoneUsageType[];

  constructor() {
    super();
    this.blockRemoval = true;
    this.phoneUsageTypes = [
      { label: "Home", value: "home" },
      { label: "Work", value: "work" },
      { label: "Mobile", value: "mobile" },
      { label: "Fax", value: "fax" }
    ];
    this.countryPhoneCodes = [
      {
        label: "+90",
        value: "+90"
      },
      {
        label: "+1",
        value: "+1"
      }
    ];
  }

  @Watch("lines")
  watchLines() {
    this.blockRemoval = this.lines.length <= 1;
  }

  addLine() {
    let checkEmptyLines = this.lines.filter(line => line.number === null);
    if (checkEmptyLines.length >= 1 && this.lines.length > 0) return;
    // this.lines.push({
    //   countryCode: null,
    //   number: null,
    //   phoneUsageType: null
    // });
  }
  removeLine(lineId: number) {
    if (!this.blockRemoval) this.lines.splice(lineId, 1);
  }

  mounted() {
    this.addLine();
  }
}
</script>