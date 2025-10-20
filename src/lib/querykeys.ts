const QUERY_KEYS = {
  USER: {
    CURRENT: ["currentUser"],
  },
  VISITORS: {
    ALL: ["visitors"],
    LATEST: ["visitors", "latest-visitors"],
    STATS: ["visitors", "stats"],
    LIST: ({
      facilityId,
      limit,
      params,
    }: {
      facilityId: string;
      limit?: number;
      params?: Record<string, any>;
    }) => ["visitors", { facilityId, limit, params }],
  },
  FACILITIES: {
    ALL: ["facilities"],
    LIST: ({
      page,
      limit,
      params,
      search,
    }: {
      page?: number;
      limit?: number;
      params?: Record<string, any>;
      search?: string;
    }) => ["facilities", { page, limit, params, search }],
    DETAIL: ({ facilityId }: { facilityId: string }) => [
      "facilities",
      { facilityId },
    ],
  },
};
export default QUERY_KEYS;
