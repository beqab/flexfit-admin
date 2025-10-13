const QUERY_KEYS = {
  USER: {
    CURRENT: ["currentUser"],
  },
  VISITORS: {
    ALL: ({
      facilityId,
      limit,
      params,
    }: {
      facilityId: string;
      limit?: number;
      params?: Record<string, any>;
    }) => ["visitors", { facilityId, limit, params }],
  },
};
export default QUERY_KEYS;
