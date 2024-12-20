import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import {
  collection,
  CollectionReference,
  query,
  where,
} from 'firebase/firestore';

import { Task } from '~/lib/tasks/types/task';

function useFetchTasks(organizationId: string) {
  const firestore = useFirestore();
  const tasksCollection = 'tasks';

  const collectionRef = collection(
    firestore,
    tasksCollection,
  ) as CollectionReference<WithId<Task>>;

  const path = `organizationId`;
  const operator = '==';
  const constraint = where(path, operator, organizationId);
  const tasksQuery = query(collectionRef, constraint);

  return useFirestoreCollectionData(tasksQuery, {
    idField: 'id',
  });
}

export default useFetchTasks;
