import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import api from "@/services/api";

import CategoryRadioButton from "@/components/CategoryRadioButton";
import Dropdown from "@/components/Dropdown";
import DropdownBrand from "@/components/DropdownBrand";
import Header from "@/components/Header";

export default function Index() {

  const categories = [
    {id: "motorcycles", label: "Motos"},
    {id: "cars", label: "Carros"},
    {id: "trucks", label: "Caminhão"},
  ];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [enableDropdownBrand, setEnableDropdownBrand] = useState(false);
  const [enableDropdownModel, setEnableDropdownModel] = useState(false);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  let route = ""; 


  const onSelectedCategory = (id: string) => {
    if (selectedCategory !== id) {
      setSelectedCategory(id);
      loadBrands(id);
    }
  }

  async function loadBrands(category: string) {
      route = `/${category}/brands`;
      const response = await api.get(route);
      setBrands(response.data);
      setEnableDropdownBrand(true);
  }
  async function loadModels(brandId: string) {
    route += `/${brandId}/models`;
    const response = await api.get(route);
    setModels(response.data);
    setEnableDropdownModel(true);
    alert(route)
  }

  return (
    <View>

      <Header /> {/* Logo fixada ao topo do app */}

      {/* Botões de categoria dos veículos */}
      <View style={styles.categoryBar}>
        {categories.map((category, index) => (
          <CategoryRadioButton 
            key={category.id}
            label={category.label}
            icon={index}
            onSelect={() => onSelectedCategory(category.id) }
            selected={selectedCategory === category.id}
          />
        ))}
      </View>
      
      <View style={styles.dropdownArea}>

        <DropdownBrand
          options={brands}
          enabled={enableDropdownBrand}
          label="Selecione uma marca"
        />

        <Dropdown
          options={models}
          enabled={enableDropdownModel}
          label="Selecione um modelo"
        />

        {/* <Dropdown
          options={models}
          enabled={enableDropdownModel}
          label="Selecione o ano do veículo"
          onSelect={() => null}
        /> */}

      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  categoryBar: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dropdownArea: {
    height: 400,
    padding: 20,
  },
});