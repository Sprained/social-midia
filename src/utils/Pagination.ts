class Pagination {
  metrics(results: any, count: number, page: number, limit: number) {
    const currentCount = Number(limit) * Number(page) + Number(limit)
    const totalPage = Math.ceil(count / limit)

    return {
      results,
      meta: {
        currentPage: Number(page),
        currentCount,
        totalCount: count,
        totalPage,
        itensInPage: results.length,
      },
    }
  }
}

export default new Pagination()
