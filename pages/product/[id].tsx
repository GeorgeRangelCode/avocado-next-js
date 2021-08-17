import React from 'react'
import fetch from 'isomorphic-unfetch'
import { GetStaticProps } from 'next'
import Layout from '@components/Layout/Layout'
import ProductSummary from '@components/ProductSummary/ProductSummary'

// dinamic pages
export const getStaticPaths = async () => {
  const response = await fetch(
    'https://avocado-next-js-george-rangel-code.vercel.app/api/avo'
  )
  const { data: productList }: TAPIAvoResponse = await response.json()

  const paths = productList.map(({ id }) => ({
    params: {
      id,
    },
  }))

  return {
    paths,
    fallback: false, // fallback: false incremental static generation 404 for everithing false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string

  const response = await fetch(
    `https://avocado-next-js-george-rangel-code.vercel.app/api/avo/${id}`
  )
  const product: TProduct = await response.json()

  return {
    props: {
      product,
    },
  }
}

const ProductPage = ({ product }: { product: TProduct }) => {
  return (
    <Layout>
      {product == null ? null : <ProductSummary product={product} />}
    </Layout>
  )
}

export default ProductPage
